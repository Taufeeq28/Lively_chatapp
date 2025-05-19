const ws = require("ws");
const url = require("url");
const admin = require("firebase-admin");
const { User } = require("./models/userModel");
const Message = require("./models/messageModel");

const createWebSocketServer = (server) => {
  const wss = new ws.WebSocketServer({ server });

  const onlineUsers = {};

  // Broadcast online users
  const notifyAboutOnlinePeople = async () => {
    const onlineUserList = await Promise.all(
      Object.values(onlineUsers).map(async (client) => {
        const user = await User.findById(client.userId);
        return {
          userId: client.userId,
          username: client.username,
          avatarLink: user?.avatarLink || null,
        };
      })
    );

    const payload = JSON.stringify({ online: onlineUserList });

    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(payload);
      }
    });
  };

  wss.on("connection", async (connection, req) => {
    // 🔐 Step 1: Extract Firebase token from query param
    const { query } = url.parse(req.url, true);
    const idToken = query.token;

    if (!idToken) {
      console.error("No token provided in query param");
      connection.close();
      return;
    }

    try {
      // 🔐 Step 2: Verify Firebase token using admin SDK
      const decoded = await admin.auth().verifyIdToken(idToken);
      const user = await User.findOne({ firebaseUid: decoded.uid });

      if (!user) {
        console.error("No MongoDB user found for Firebase UID");
        connection.close();
        return;
      }

      connection.userId = user._id.toString();
      connection.username = `${user.firstName} ${user.lastName}`;
      onlineUsers[connection.userId] = connection;

      notifyAboutOnlinePeople();
      console.log(`✅ ${connection.username} connected`);
    } catch (err) {
      console.error("Firebase token verification failed:", err);
      connection.close();
      return;
    }

    // 🔁 Keep-alive mechanism
    connection.isAlive = true;
    connection.timer = setInterval(() => {
      connection.ping();
      connection.deathTimer = setTimeout(() => {
        connection.isAlive = false;
        clearInterval(connection.timer);
        connection.terminate();
        delete onlineUsers[connection.userId];
        notifyAboutOnlinePeople();
        console.log(`❌ ${connection.username} timed out`);
      }, 1000);
    }, 5000);

    connection.on("pong", () => clearTimeout(connection.deathTimer));

    // 📨 Handle incoming messages
    connection.on("message", async (msg) => {
      try {
        const messageData = JSON.parse(msg);
        const { recipient, text } = messageData;

        if (recipient && text) {
          const msgDoc = await Message.create({
            sender: connection.userId,
            recipient,
            text,
          });

          // Broadcast to both sender and recipient
          [connection.userId, recipient].forEach((userId) => {
            const client = onlineUsers[userId];
            if (client && client.readyState === ws.OPEN) {
              client.send(
                JSON.stringify({
                  _id: msgDoc._id,
                  sender: connection.userId,
                  recipient,
                  text,
                  createdAt: msgDoc.createdAt,
                })
              );
            }
          });
        }
      } catch (error) {
        console.error("❌ Message handling error:", error);
      }
    });

    connection.on("close", () => {
      delete onlineUsers[connection.userId];
      notifyAboutOnlinePeople();
      console.log(`❌ ${connection.username} disconnected`);
    });
  });
};

module.exports = createWebSocketServer;

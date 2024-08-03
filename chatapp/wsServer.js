const ws = require("ws");
const jwt = require("jsonwebtoken");
const { User } = require("./models/userModel");
const Message = require("./models/messageModel");

const createWebSocketServer = (server) => {
  const wss = new ws.WebSocketServer({ server });

  // Object to store online users
  const onlineUsers = {};

  wss.on("connection", (connection, req) => {
    // Notify all clients about online users
    const notifyAboutOnlinePeople = async () => {
      const onlineUserList = await Promise.all(
        Object.values(onlineUsers).map(async (client) => {
          const user = await User.findById(client.userId);
          return {
            userId: client.userId,
            username: client.username,
            avatarLink: user ? user.avatarLink : null,
          };
        })
      );

      wss.clients.forEach((client) => {
        client.send(
          JSON.stringify({
            online: onlineUserList,
          })
        );
      });
    };

    connection.isAlive = true;
    connection.timer = setInterval(() => {
      connection.ping();
      connection.deathTimer = setTimeout(() => {
        connection.isAlive = false;
        clearInterval(connection.timer);
        connection.terminate();
        delete onlineUsers[connection.userId];
        notifyAboutOnlinePeople();
        console.log(`User ${connection.username} is disconnected`);
      }, 1000);
    }, 5000);

    connection.on("pong", () => {
      clearTimeout(connection.deathTimer);
    });

    // Extract authToken from cookies
    const cookies = req.headers.cookie;
    if (cookies) {
      const tokenString = cookies
        .split(";")
        .find((str) => str.trim().startsWith("authToken="));
      if (tokenString) {
        const token = tokenString.split("=")[1];
        jwt.verify(token, process.env.JWTPRIVATEKEY, {}, (err, userData) => {
          if (err) console.log(err);
          const { _id, firstName, lastName } = userData;
          connection.userId = _id;
          connection.username = `${firstName} ${lastName}`;
          onlineUsers[connection.userId] = connection;
          notifyAboutOnlinePeople();
          console.log(`User ${connection.username} connected`);
        });
      }
    }

    connection.on("message", async (message) => {
      try {
        const messageData = JSON.parse(message);
        const { recipient, text } = messageData;

        if (recipient && text) {
          const msgDoc = await Message.create({
            sender: connection.userId,
            recipient,
            text,
          });

          if (onlineUsers[recipient]) {
            onlineUsers[recipient].send(
              JSON.stringify({
                sender: connection.username,
                text,
                id: msgDoc._id,
              })
            );
          }
        }
      } catch (err) {
        console.error("Error processing message:", err);
      }
    });

    connection.on("close", () => {
      delete onlineUsers[connection.userId];
      notifyAboutOnlinePeople();
      console.log(`User ${connection.username} has disconnected`);
    });
  });
};

module.exports = createWebSocketServer;

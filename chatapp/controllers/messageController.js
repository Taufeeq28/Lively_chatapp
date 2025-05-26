const Message = require("../models/messageModel");

const messageController = async (req, res) => {
  // ✅ Add CORS headers manually
  res.setHeader("Access-Control-Allow-Origin", "https://lively-chatapp-frontend.vercel.app");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  try {
    const { userId } = req.params;

    // Firebase token is already verified and attached in req.user by protect middleware
    const currentUserUid = req.user.uid;

    const { User } = require("../models/userModel");
    const ourUser = await User.findOne({ firebaseUid: currentUserUid });

    if (!ourUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const ourUserId = ourUser._id;

    const messages = await Message.find({
      sender: { $in: [userId, ourUserId] },
      recipient: { $in: [userId, ourUserId] },
    }).sort({ createdAt: 1 });

    return res.status(200).json(messages);
  } catch (error) {
    console.error("Error in messageController:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = messageController;

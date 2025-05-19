const Message = require("../models/messageModel");

const messageController = async (req, res) => {
  try {
    const { userId } = req.params;

    // Firebase token is already verified and attached in req.user by protect middleware
    const currentUserUid = req.user.uid;

    // You can now find your MongoDB user by firebaseUid or email (preferably UID)
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

    res.json(messages);
  } catch (error) {
    console.error("Error in messageController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = messageController;

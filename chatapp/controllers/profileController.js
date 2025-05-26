const { User } = require("../models/userModel");

// GET /api/user/profile
const profileController = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://lively-chatapp-frontend.vercel.app");
res.setHeader("Access-Control-Allow-Credentials", "true");
res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  try {
    const firebaseUid = req.user.uid;

    const user = await User.findOne({ firebaseUid }).select("-password -__v");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error in profileController:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// PUT /api/user/profile/update
const profileUpdate = async (req, res) => {
  try {
    const firebaseUid = req.user.uid;
    const { firstName, lastName, avatarLink } = req.body;

    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.avatarLink = avatarLink || user.avatarLink;

    await user.save();

    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error in profileUpdate:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { profileController, profileUpdate };

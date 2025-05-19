const { User } = require("../models/userModel");

const peopleController = async (req, res) => {
  try {
    const currentUserUid = req.user.uid;

    // Optionally: exclude current user from the list
    const users = await User.find({ 
      verified: true, 
      firebaseUid: { $ne: currentUserUid }
    }).select("-password -__v");

    res.status(200).json(users);
  } catch (error) {
    console.error("Error in peopleController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = peopleController;

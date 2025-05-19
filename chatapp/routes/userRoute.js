const express = require('express');
const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');
const verifyEmail = require('../controllers/emailVerifyController');
const profileController = require('../controllers/profileController');
const messageController = require('../controllers/messageController');
const peopleController = require('../controllers/peopleController');
const protect = require('../middleware/protect');
const { User } = require("../models/userModel");


const router = express.Router();

// Public routes
// router.post("/register", registerController);
// router.post("/login", loginController);
// router.get("/:id/verify/:token", verifyEmail);

// Protected routes (Firebase token required)
// In userRoute.js
router.post("/create-mongo", protect, async (req, res) => {
    const { firstName, lastName, avatarLink } = req.body;
    try {
      const existing = await User.findOne({ firebaseUid: req.user.uid });
      if (existing) {
        return res.status(409).json({ message: "User already exists" });
      }
  
      const newUser = new User({
        firebaseUid: req.user.uid,
        email: req.user.email,
        firstName,
        lastName,
        avatarLink,
        verified: true,
      });
  
      await newUser.save();
      res.status(201).json({ message: "MongoDB user created" });
    } catch (err) {
      console.error("Create Mongo user error:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  
router.get("/profile", protect, profileController.profileController);
router.put("/profile/update", protect, profileController.profileUpdate);
router.get("/messages/:userId", protect, messageController);
router.get("/people", protect, peopleController);

module.exports = router;

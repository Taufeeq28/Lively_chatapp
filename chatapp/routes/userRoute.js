// const express = require('express');
// const registerController = require('../controllers/registerController');
// const loginController = require('../controllers/loginController');
// const verifyEmail = require('../controllers/emailVerifyController');
// const profileController = require('../controllers/profileController');
// const messageController = require('../controllers/messageController');
// const peopleController = require('../controllers/peopleController');
// const router = express.Router();

// router.post("/register", registerController);
// router.post("/login", loginController);
// router.get("/:id/verify/:token", verifyEmail);
// router.get("/profile", profileController.profileController);
// router.get("/messages/:userId", messageController);
// router.get("/people", peopleController);
// router.put("/profile/update", profileController.profileUpdate);

// module.exports = router;
const express = require('express');
const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');
const verifyEmail = require('../controllers/emailVerifyController');
const profileController = require('../controllers/profileController');
const messageController = require('../controllers/messageController');
const peopleController = require('../controllers/peopleController');
const protect = require('../middleware/protect');  // Import the protect middleware
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/:id/verify/:token", verifyEmail);

// Apply the protect middleware to routes that require authentication
router.get("/profile", async (req, res, next) => {
  try {
    const userData = await protect(req);
    req.user = userData;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
}, profileController.profileController);

router.get("/messages/:userId", async (req, res, next) => {
  try {
    const userData = await protect(req);
    req.user = userData;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
}, messageController);

router.get("/people", async (req, res, next) => {
  try {
    const userData = await protect(req);
    req.user = userData;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
}, peopleController);

router.put("/profile/update", async (req, res, next) => {
  try {
    const userData = await protect(req);
    req.user = userData;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
}, profileController.profileUpdate);

module.exports = router;


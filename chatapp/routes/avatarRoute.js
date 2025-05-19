const express = require('express');
const avatarController = require('../controllers/avatarController');
const protect = require('../middleware/protect');
const router = express.Router();

router.post("/", protect, avatarController.avatarController); // 🔐 optional
router.get("/all", avatarController.getAllAvatars); // Public: for selection

module.exports = router;

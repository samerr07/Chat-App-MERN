const express = require('express');
const { isAuthenticated } = require('../middleware/auth');
const { sendMessage, getMessage } = require('../controller/messageController');
const router = express.Router();

router.post("/send/:id", isAuthenticated, sendMessage)
router.get("/getMessage/:id", isAuthenticated, getMessage)



exports.router = router;
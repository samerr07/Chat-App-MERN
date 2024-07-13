const express = require("express");
const { createUser, loginUser, logoutUser, getOtherUsers } = require("../controller/userController");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();


router.post("/register",  createUser)
router.post("/login",  loginUser)
router.get("/logout",  logoutUser)
router.get("/otherUsers", isAuthenticated, getOtherUsers)



exports.router = router;
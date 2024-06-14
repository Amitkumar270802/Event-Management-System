const express = require("express");
const router = express.Router();

const {
  messageController,
  getmessageController,
} = require("./../controller/Message_Controller");
const { isAdmin, auth, isStudent } = require("../middlewares/auth");

// create event
router.post("/message", auth, isStudent, messageController);
router.get("/getallmessage", auth, isAdmin, getmessageController);

module.exports = router;

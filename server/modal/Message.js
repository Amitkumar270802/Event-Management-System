const mongoose = require("mongoose");
const message_Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is requiredD"],
    },
    phone: {
      type: String,
      required: [true, "Description is required"],
    },
    college: {
      type: String,
      required: [true, "College is required"],
    },
    message: {
      type: String,
      required: [true, "message is required"],
    },
  },
  { timestamps: true }
);
const messageModel = mongoose.model("Message", message_Schema);
module.exports = messageModel;

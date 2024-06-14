const mongoose = require("mongoose");

const user_Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is requiredD"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    profileImg: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, "Mobile no. is required"],
    },
    reg_no: {
      type: String,
      required: [true, "Registration No. is required"],
    },
    token: {
      type: String,
    },
    role: {
      type: String,
      required: [true, "Role No. is required"],
    },
    events: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Event",
      },
    ],
    saveEvents: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Event",
      },
    ],
  },
  { timestamps: true }
);
const userModel = mongoose.model("User", user_Schema);
module.exports = userModel;

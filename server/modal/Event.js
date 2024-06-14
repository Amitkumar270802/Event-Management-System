const mongoose = require("mongoose");

const event_Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is requiredD"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    venue: {
      type: String,
      required: [true, "Venue is required"],
    },
    date: {
      type: String,
      required: [true, "Date is required"],
    },
    users: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);
const eventModel = mongoose.model("Event", event_Schema);
module.exports = eventModel;

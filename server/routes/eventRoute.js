const express = require("express");
const router = express.Router();

const {
  createEventController,
  getAllEventsController,
  event_regEventsController,
  updateEventController,
  deleteEventByIdController,
} = require("./../controller/Event_Controller");
const { isAdmin, auth } = require("../middlewares/auth");

// get all events
router.get("/all-event", getAllEventsController);

// create event
router.post("/create-event", auth, isAdmin, createEventController);

// get all the student registered from particular event
router.get("/event_reg/:id", auth, isAdmin, event_regEventsController);

// update the event
router.put("/update-event/:id", auth, isAdmin, updateEventController);

// Delete the Event
router.delete("/delete-event/:id", auth, isAdmin, deleteEventByIdController);

module.exports = router;

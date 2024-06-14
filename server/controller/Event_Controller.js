const eventModel = require("./../modal/Event");

exports.getAllEventsController = async (req, res) => {
  try {
    const events = await eventModel.find({}).populate("users");
    if (!events) {
      return res.status(200).send({
        success: false,
        message: "No Events Found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "No Events Found",
      events,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Server Error",
    });
  }
};
exports.event_regEventsController = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await eventModel.findById(id).populate("users");
    if (!event) {
      return res.status(404).send({
        success: false,
        message: "Event Not Found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Event Found",
      event,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Server Error in finding Blog",
    });
  }
};
exports.updateEventController = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await eventModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Event Updated",
      event,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Server Error",
    });
  }
};
exports.createEventController = async (req, res) => {
  try {
    const { title, description, image, venue, date } = req.body;
    if (!title || !description || !image || !venue || !date) {
      return res.status(400).send({
        success: false,
        message: "All Fields are Required",
      });
    }
    const event = new eventModel({ title, description, image, venue, date });
    await event.save(); // Make sure to await the save operation

    return res.status(201).send({
      success: true,
      message: "Event Created",
      event,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Server Error",
    });
  }
};

exports.deleteEventByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const event = await eventModel.findById(id);

    // Check if the event exists
    if (!event) {
      return res.status(404).send({
        success: false,
        message: "Event not found",
      });
    }

    // Delete the event ID from students' events array
    for (const userId of event.users) {
      const user = await studentModel.findById(userId);
      if (user) {
        user.events.pull(id);
        await user.save();
      }
    }
    // Delete the event
    await eventModel.findByIdAndDelete(id);
    return res.status(200).send({
      success: true,
      message: "Event Deleted",
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Server Error in Deleting Blog",
      error,
    });
  }
};

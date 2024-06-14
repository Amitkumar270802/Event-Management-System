const messageModel = require("./../modal/Message");

exports.getmessageController = async (req, res) => {
  try {
    const newMessage = await messageModel.find({});
    return res.status(200).send({
      success: true,
      message: "Event Created",
      newMessage,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Server Error",
    });
  }
};
exports.messageController = async (req, res) => {
  try {
    const { name, phone, message, college } = req.body;
    if (!name || !phone || !message || !college) {
      return res.status(400).send({
        success: false,
        message: "All Fields are Required",
      });
    }
    const newMessage = new messageModel({ name, phone, message, college });
    await newMessage.save(); // Make sure to await the save operation

    return res.status(201).send({
      message: "Message Send",
      success: true,
      newMessage,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Server Error",
    });
  }
};

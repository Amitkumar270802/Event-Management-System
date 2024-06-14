const eventModel = require("../modal/Event");
const userModel = require("../modal/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.registerController = async (req, res) => {
  try {
    const { name, email, password, reg_no, phone } = req.body;
    const role = "user";
    // validation
    if (!name || !email || !password || !reg_no || !phone || !role) {
      return res.status(400).send({
        success: false,
        message: "Please Enter all fields",
      });
    }

    // existingUser
    const existingStudent = await userModel.findOne({ email });
    if (existingStudent) {
      return res.status(401).send({
        success: false,
        message: "Already Registered",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // save new User
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      reg_no,
      phone,
      role,
      profileImg: `https://api.dicebear.com/6.x/initials/svg?seed=${name} &backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`,
    });
    await user.save();
    return res.status(201).send({
      message: "New Student Registered",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in Register callback",
      success: false,
      error,
    });
  }
};

exports.updateUserDetailsController = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedDetails = await userModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    return res.status(201).send({
      message: "New Student Registered",
      success: true,
      updatedDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in Register callback",
      success: false,
      error,
    });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const user = await userModel.find({}).populate("events");
    return res.status(200).send({
      success: true,
      message: "Get All User",
      userCount: user.length,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting Users",
      error,
    });
  }
};

exports.getAUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    return res.status(200).send({
      success: true,
      message: "Get User",
      userCount: user.length,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting Users",
      error,
    });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { password, email } = req.body;
    if (!password || !email) {
      return res.status(400).send({
        success: false,
        message: "Please Enter all fields",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      user.token = token;
      await user.save();
      user.password = undefined;

      // create cookie
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged In Successfully",
      });
    } else {
      return res.status(400).json({
        success: true,
        message: "Password is Incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Login Users",
      error,
    });
  }
};

exports.eventRegController = async (req, res) => {
  try {
    const { studentId, eventId } = req.body;
    const user = await userModel.findById(studentId);
    const event = await eventModel.findById(eventId);

    if (!user || !event) {
      return res.status(404).json({ message: "Student or event not found" });
    }

    if (user.events.includes(eventId)) {
      return res
        .status(400)
        .json({ message: "Student is already registered for this event" });
    }

    event.users.push(studentId);
    await event.save();

    user.events.push(eventId);
    await user.save();

    return res.status(201).send({
      success: true,
      message: "New Student Registered",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in Register callback",
      success: false,
      error,
    });
  }
};

exports.saveEventController = async (req, res) => {
  try {
    const { studentId, eventId } = req.body;
    const user = await userModel.findById(studentId);
    const event = await eventModel.findById(eventId);

    if (!user || !event) {
      return res.status(404).json({ message: "Student or event not found" });
    }
    if (user.saveEvents.includes(eventId))
      return res.status(404).json({ message: "Already Bookmarked" });
    user.saveEvents.push(eventId);
    user.save();
    return res.status(201).send({
      success: true,
      message: "Event Saved",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Server Error",
      success: false,
      error,
    });
  }
};

exports.unSaveEventController = async (req, res) => {
  try {
    const { studentId, eventId } = req.body;
    const user = await userModel.findById(studentId);
    const event = await eventModel.findById(eventId);

    if (!user || !event) {
      return res.status(404).json({ message: "Student or event not found" });
    }
    user.saveEvents.pull(eventId);
    user.save();
    return res.status(201).send({
      success: true,
      message: "Event Removed from bookmark",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Server Error",
      success: false,
      error,
    });
  }
};

exports.getSaveEventController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id).populate("saveEvents");

    if (!user) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.status(201).send({
      success: true,
      message: "Get All Saved Events",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Server Error",
      success: false,
      error,
    });
  }
};

exports.student_regEventsController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id).populate("events");
    if (!user) {
      return res.status(200).send({
        message: "Student Not Found",
        success: true,
      });
    }
    return res.status(201).send({
      message: "Student Found",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in Register callback",
      success: false,
      error,
    });
  }
};

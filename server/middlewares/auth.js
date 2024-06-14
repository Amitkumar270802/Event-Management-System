const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    // console.log("Cookie : ", req.cookies.token);
    // console.log("Token : ", req.body.token);

    const token =
      req.body.token ||
      req.cookies.token ||
      req.header("Authorization").replace("Bearer ", "");

    if (!token || token == undefined) {
      return res.sendStatus(401).json({
        success: false,
        message: "Token Missing",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      req.student = decode;
    } catch (err) {
      return req.sendStatus(401).json({
        success: false,
        message: "token is Invalid",
      });
    }
    next();
  } catch (err) {
    return res.sendStatus(401).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

exports.isStudent = (req, res, next) => {
  try {
    if (req.student.role !== "user") {
      return res.sendStatus(401).json({
        success: false,
        message: "This is protected route for student ",
      });
    }
    next();
  } catch (err) {
    return res.sendStatus(401).json({
      success: false,
      message: "Role is not matching",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.student.role !== "admin") {
      return res.sendStatus(401).json({
        success: false,
        message: "This is protected route for admin ",
      });
    }
    next();
  } catch (err) {
    return res.sendStatus(401).json({
      success: false,
      message: "Role is not matching",
    });
  }
};

const express = require("express");
const router = express.Router();

const { auth, isStudent, isAdmin } = require("../middlewares/auth");
const {
  getAllUser,
  registerController,
  loginController,
  eventRegController,
  student_regEventsController,
  saveEventController,
  getSaveEventController,
  unSaveEventController,
  updateUserDetailsController,
  getAUserById,
} = require("../controller/User_Controller");

// create User
router.post("/register", registerController);
// Login
router.post("/login", loginController);

// get All users
router.get("/allStudent", auth, isAdmin, getAllUser);

// get user by id
router.get("/:id", auth, isStudent, getAUserById);

// Event Registration
router.post("/event_reg", auth, isStudent, eventRegController);

router.post("/save_event", auth, isStudent, saveEventController);

router.get("/getSavedEvent/:id", auth, isStudent, getSaveEventController);

router.post("/unSavedEvent", auth, isStudent, unSaveEventController);
router.put("/update-details/:id", auth, isStudent, updateUserDetailsController);

// get all the events registered by a particular student
router.get("/student_reg/:id", student_regEventsController);

// middleware
router.get("/student-page", auth, isStudent, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Student Page",
  });
});
router.get("/admin-page", auth, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Admin Page",
  });
});

module.exports = router;

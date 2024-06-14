const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");
const database = require("./config/connection");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

database.database_Connection();

const eventRoute = require("./routes/eventRoute");
const userRoute = require("./routes/userRoute");
const messageRoute = require("./routes/messageRoute");

// PORT
const PORT = process.env.PORT || 8080;

app.use("/api/v1/event", eventRoute);
app.use("/api/v1/student", userRoute);
app.use("/api/v1/user", messageRoute);

// listen
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

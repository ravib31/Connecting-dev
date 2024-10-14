const express = require("express");
const connectDB = require("./config/database.js");
const User = require("./models/user.js");
const bcrypt = require("bcrypt");
const { validateSignupData } = require("./utils/validatoin.js");
var cookieParser = require("cookie-parser");
var jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth.js");
const app = express();
require("./config/database.js");

app.use(express.json());
app.use(cookieParser());
const authRouter = require("./routes/auth.js");
const requestRouter = require("./routes/request.js");
const profileRouter = require("./routes/profile.js");


app.use("/", authRouter);
app.use("/", requestRouter);
app.use("/", profileRouter);
// Start the server
connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("connection  established to MongoDB");
      console.log("Server is running on port 3000...");
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

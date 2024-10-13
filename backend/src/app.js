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

app.post("/signup", async (req, res) => {
  try {
    validateSignupData(req);
    const { firstName, lastName, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    await user.save();
    res.send("User added successfully");
  } catch (error) {
    res.status(500).send("Error adding user" + error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }
    const token = await jwt.sign({ _id: user._id }, "Bhashkar");
    console.log(token);
    res.cookie("token", token);
    res.send("Login successful");
  } catch (error) {
    res.status(500).send("Error logging in" + error.message);
  }
});

app.get("/profile", userAuth,async (req, res) => {
  try {
   const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("Error :" + error.message);
  }
});


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

// respond with "hello world" when a GET request is made to the homepage
// app.get('/', (req, res) => {
//   res.send('hello world')
// })

const express = require('express');
const User = require('../models/user');
const bcrypt = require("bcrypt");
const { validateSignupData } = require("../utils/validatoin.js");
var jwt = require("jsonwebtoken");


const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
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


authRouter.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).send("User not found");
      }
      const isMatch = await user.validatePassword(password);
      if (!isMatch) {
        return res.status(401).send("Invalid credentials");
      }
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 9000000),
      });
      res.send("Login successful");
    } catch (error) {
      res.status(500).send("Error logging in" + error.message);
    }
  });


module.exports = authRouter;
const express = require('express');
const { userAuth } = require('../middlewares/auth');
const { validateProfileEditData } = require('../utils/validatoin');


const profileRouter = express.Router();


profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
      const user = req.user;
      res.send(user);
    } catch (error) {
      res.status(400).send("Error :" + error.message);
    }
  });

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
      if(!validateProfileEditData(req)){
      throw new Error("Invalid Edit data");
    }
    const loginUser = req.user;
    console.log(loginUser);
    Object.keys(req.body).forEach((key)=>
      loginUser[key] = req.body[key]);
    console.log(loginUser);
    res.send(`${loginUser.firstName} Profile updated successfully`);
   } catch (error) {
      res.status(400).send("Error :" + error.message);
    }
  });
  module.exports = profileRouter;
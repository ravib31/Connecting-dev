const express = require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');

const requestRouter = express.Router();
requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;
    const allowedStatus = ["ignored", "interested"];
    if(!allowedStatus.includes(status)){
      return res.status(400).send("Invalid status");
    }

    const toUser = await User.findById(toUserId);
    if(!toUser){
      return res.status(404).json({message:"User not found"});
    }

    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
      fromUserId,
      toUserId,
    });
    if(existingConnectionRequest){
      return res.status(400).send("Connection request already sent");
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });
    const requestData = await connectionRequest.save();
    res.json({
      message: "Connection request sent successfully",
      data: requestData,
    })
    
  } catch (error) {
    res.status(500).send(error.message);
  }
  // res.send(fromUserId.firstName + " " + "Sent connection request" + toUserId.firstName);
  });

  module.exports = requestRouter;
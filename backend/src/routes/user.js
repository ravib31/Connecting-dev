const express = require('express');
const { userAuth } = require('../middlewares/auth');
const connectionRequestModel = require('../models/connectionRequest');
const userRouter = express.Router();


userRouter.get("/user/requests",userAuth, async(req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequest = await connectionRequestModel.find({
            toUserId:loggedInUser._id,
            status:"interested"
        })
        res.json({message:"Data fetch successfully",data:connectionRequest})
    } catch (error) {
        res.status(400).send("Error :" + error.message);
    }
});

module.exports = userRouter;

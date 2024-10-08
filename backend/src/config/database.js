const mongoose = require('mongoose');

const connectDB = async()=>{
    mongoose.connect('mongodb+srv://ravibhashkar0102:HZd6yMO6hY9RTOcv@cluster0.t7vfq.mongodb.net/connectingDev', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
}
module.exports = connectDB;
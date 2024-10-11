const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim:true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
   age: {
        type: Number,
    },
    gender:{
        type: String,
        validate(value){
            if(value.toLowerCase() !== "male" && value.toLowerCase() !== "female" && value.toLowerCase() !== "other"){
                throw new Error("Gender must be either male, female or other")
            }
        }
    },
    photoUrl:{
        type: String,
        default:"https://avatars.githubusercontent.com/u/107496019?v=4"
    },
    about:{
        type: String,
        default:"This is default for about"
    },
    skills:{
        type: [String],
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
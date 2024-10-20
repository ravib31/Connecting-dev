const mongoose = require("mongoose");
var validator = require("validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      index:true,
      maxLength: 20,
    },
    lastName: {
      type: String,
      maxLength: 20,
      // required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      validate(value) {
        if (
          value.toLowerCase() !== "male" &&
          value.toLowerCase() !== "female" &&
          value.toLowerCase() !== "other"
        ) {
          throw new Error("Gender must be either male, female or other");
        }
      },
    },
    photoUrl: {
      type: String,
      default: "https://avatars.githubusercontent.com/u/107496019?v=4",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Url is invalid" + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is default for about",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ email: 1 });

userSchema.methods.getJWT = async function () {
  /* dont use arrow function it will break this functionality */
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "Bhashkar", {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    /* dont use arrow function it will break this functionality */
  const user = this;
  const hashedPassword = user.password;
  const isMatch = await bcrypt.compare(passwordInputByUser, hashedPassword);
  return isMatch;
};

const User = mongoose.model("User", userSchema);
module.exports = User;

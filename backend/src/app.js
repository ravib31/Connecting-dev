const express = require("express");
const connectDB = require("./config/database.js");
const User = require("./models/user.js");
const app = express();
require("./config/database.js");

app.use(express.json());

app.post("/signup", async (req, res) => {
  // console.log(req.body);
  const userObj = req.body;
  const user = new User(userObj);
  try {
    await user.save();
    res.send("User added successfully");
  } catch (error) {
    res.status(500).send("Error adding user" + error.message);
  }
});
app.get("/user", async (req, res) => {
  // console.log(req.body);
  const userEmail = req.body.emailId;
  try {
    const user = await User.find({ email: userEmail });
    // console.log(user);
    if (user.length == 0) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(500).send("Error adding user" + error.message);
  }
});

app.get("/users", async (req, res) => {
  // console.log(req.body);
  try {
    const user = await User.find();
    // console.log(user);
    if (user.length == 0) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(500).send("Error adding user" + error.message);
  }
});

app.delete("/user", async (req, res) => {
  // console.log(req.body);
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    // console.log(user);
    if (user.deletedCount == 0) {
      res.status(404).send("User not found");
    } else {
      res.send("User deleted successfully");
    }
  } catch (error) {
    res.status(500).send("Error adding user" + error.message);
  }
});

app.patch("/user/:userId", async (req, res) => {
  // console.log(req.body);
  const userId = req.params?.userId;
  const userData = req.body;

  try {
    const ALLOWED_UPDATED = [
      "photoUrl","about","password","gender","age","skills"
    ]
    const isUpdateAllowed = Object.keys(userData).every((key) =>
      ALLOWED_UPDATED.includes(key)
    );
    if(!isUpdateAllowed){
      throw new Error("Invalid update")
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, userData, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("User updated successfully");
  } catch (error) {
    res.status(500).send("Error adding user" + error.message);
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

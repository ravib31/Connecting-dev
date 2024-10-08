const express = require('express');
const connectDB = require('./config/database.js');
const User = require('./models/user.js');
const app = express();
require('./config/database.js')



app.post('/signup',async(req,res)=>{
    const userObj={
      firstName:"Motu",
      lastName:"singh",
      email:'Motu@gmail.com',
      password:'Motu0808@'
    }
    const user = new User(userObj);
    try {
      await user.save();
      res.send('User added successfully');
    } catch (error) {
      res.status(500).send('Error adding user'+err.message);
    }
   
   
});


// Start the server
connectDB().then(()=>{
  app.listen(3000, () => {
    console.log('connection  established to MongoDB');
    console.log('Server is running on port 3000...')
  })
}).catch((err)=>{
  console.log('Error connecting to MongoDB', err);
})


// respond with "hello world" when a GET request is made to the homepage
// app.get('/', (req, res) => {
//   res.send('hello world')
// })
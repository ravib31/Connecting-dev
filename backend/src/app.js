const express = require('express');
const connectDB = require('./config/database.js');
const app = express();
require('./config/database.js')



app.use('/user',(req,res,next)=>{
    console.log('route 1')
    // res.send('route 1')
    next()
})
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
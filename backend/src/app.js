const express = require('express')
const app = express();



app.use('/user',(req,res,next)=>{
    console.log('route 1')
    // res.send('route 1')
    next()
},(req, res)=>{
    console.log('route 2')
    res.send('route 2')
})
// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000...')
})

// respond with "hello world" when a GET request is made to the homepage
// app.get('/', (req, res) => {
//   res.send('hello world')
// })
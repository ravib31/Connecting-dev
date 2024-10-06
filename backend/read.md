
// if we use app.use it will work for all the routes method (GET,POST...)
// app.use('/test',(req,res)=>{
//   res.send('hello world')
// })


app.get('/user/:userId/:pass', (req, res) => {
    console.log(req.params)
  res.send({firstName:"Ravi",age:26})
});

// app.get('/user', (req, res) => {
//   res.send('User data fetched')
// });
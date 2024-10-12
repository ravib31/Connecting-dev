
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


You can secure your database by using validator,and validator dont work for previousily data which was created before validator,If you want to update your existing data it will not work ,to use this you have to write the syntax  runValidators: true in the patch Api.


Api Level Validation -
1- If user wants to update the data so you can strict the user,user can change only certain things.
    
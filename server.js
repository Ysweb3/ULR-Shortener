const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.get('/',(req, res) =>{
//   console.log('Hello World');
//   res.render("index", {namee: "Node!"})
// })


const userRouter = require('./routes/users');
app.use('/users', userRouter);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
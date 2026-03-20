const express = require('express');
const {nanoid} = require('nanoid');


const app = express();

const code = nanoid(6);
console.log(code);

app.set('view engine', 'ejs');
app.use(express.json());

const shortUrlRouter = require('./routes/shorten');
app.use('/shorten', shortUrlRouter);

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
require('dotenv/config')
const express = require('express');

const app = express();



app.set('view engine', 'ejs');
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index');
});


const shortUrlRouter = require('./routes/shorten');
app.use('/shorten', shortUrlRouter);

app.get('/:code', async(req, res) => {
    console.log(req.params.code);
    const url = await prisma.url.findUnique({
        where: {
        shortCode: req.params.code
    }
  })
  if(!url){
    res.status(404).send('URL not found');
    console.log('URL not found '+req.params.code);
    
  }
  else{
      res.redirect(url.longUrl);

  }

});


app.listen(3000, () => {
    console.log('Server running on port 3000');
});
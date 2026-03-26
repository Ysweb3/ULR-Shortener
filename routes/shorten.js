const express = require('express');
const router = express.Router();
const {nanoid} = require('nanoid');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

function isValidUrl(string){
  try{
    new URL(string);
    return true;
  }
  catch(err){
    return false;
  }
}



router.post('/', async(req, res) => {
    const code = nanoid(6);
   
    console.log("longUrl: " + req.body.longUrl);
    if(isValidUrl(req.body.longUrl)){
      const result = await prisma.url.create({
        data: {
        longUrl: req.body.longUrl,
        shortCode: code,
        }
    })
    console.log("code: " + code);
    res.send(result);
    }
    else{
      res.status(404).send('URL not valid');
    }
});


module.exports = router;

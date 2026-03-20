const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    console.log(req.body.longUrl);
    res.send(req.body.longUrl);
});

module.exports = router;

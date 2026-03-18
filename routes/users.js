const express = require('express');
const router = express.Router();

router.get('/',(req, res) =>{
  res.send(" users List")
  console.log(req.query.name);
})

router.get('/users',(req, res) =>{
  res.send(" Hello users")
})

router.get('/new',(req, res) =>{
  res.render('users/new',{firstName: 'test'});
})

router.post('/',(req, res) =>{
    console.log(req.body.firstName);
    const isVaild = true;
    if(isVaild){
        users.push({firstName: req.body.firstName});
        res.redirect("/users/"+(users.length-1));
    }
    else{
        console.log("Error");
        res.render("users/new",{firstName: req.body.firstName});
    }
})

router.route('/:id')
.get(('/:id',(req, res) =>{
  res.send(" user created with id " + req.params.id)
  console.log(req.user);
}))
.put(('/:id',(req, res) =>{
  res.send(" updated user with id " + req.params.id)
}))
.delete(('/:id',(req, res) =>{
  res.send(" deleted user with id " + req.params.id)
}))

const users = [{name: 'John'},{name: 'Peter'}];
router.param('id', (req, res ,next, id) =>{
    console.log(id+" user");
    req.user = users[id];
    next();
})



module.exports = router;
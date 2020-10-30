const express = require('express');
const router = express.Router();
// const users = require('../users.js');
const User = require('../models').User;
const Fruit = require('../models').Fruit;

// GET USERS PROFILE
router.get("/profile/:id", (req, res) => {
    // IF USER ID FROM TOKEN MATCHES THE REQUESTED ENDPOINT, LET THEM IN
    if (req.user.id == req.params.id) {
      User.findByPk(req.params.id, {
        include: [
          {
            model: Fruit,
            attributes: ["id", "name"],
          },
        ],
      }).then((userProfile) => {
        res.render("users/profile.ejs", {
          user: userProfile,
        });
      });
    } else {
      // res.json("unauthorized");
      res.redirect("/");
    }
  });

//EDIT USER PROFILE
router.put('/profile/:id', (req, res) => { //:index is the index of our users array that we want to change
	User.update(req.body, { //in our users array, find the index that is specified in the url (:index).  Set that element to the value of req.body (the input data)
        where: {id: req.params.id},
        returning: true,
    }).then((user)=>{
        res.redirect('/users'); //redirect to the index page
    });   
});

//DELETE USER PROFILE
router.delete('/profile/:id', (req,res)=>{
    User.destroy({ where: {id: req.params.id} }).then(() => {
        console.log(req.params.id);
        res.redirect('/users')
    });
});

// GET ==> Fruits index Page
router.get('/', (req,res)=>{
    res.render('users/index.ejs')
});

// LISTEN
module.exports = router;
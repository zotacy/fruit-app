const express = require('express');
const router = express.Router();
// const users = require('../users.js');
const User = require('../models').User

// Hompage/routes
router.get("/", (req,res) => {
    User.findAll().then((user) => {
        res.render("users/index.ejs", {
            users: user,
        });
    });
});

// SIGN-UP
//GET ==> Sign-up Page
router.get('/signup', (req,res) => {
    res.render('users/signup.ejs');
})
//POST ==> Create a new user
router.post('/', (req,res)=> {
    User.create(req.body).then((user) => {
        res.redirect(`/users/profile/${User.length - 1}`);
    });
});
//GET ==> Profile
router.get("/profile/:id", (req, res) => {
    User.findByPk(req.params.id,{
        include:[
            {
                model: Fruit,
                attributes: ["id", "name"]
            }
        ]
    }).then((userProfile) => {
        res.render("users/profile.ejs", {
            user: userProfile,
        });
    });
});

//Login
//GET ==> Login Page
router.get('/login', (req,res)=>{
    res.render('users/login.ejs');
})
//GET ==> Profile Page
router.get('/:id', (req,res) => {
    User.findByPk(req.params.id).then((user)=> { 
        res.render('users/profile.ejs',{
            user: user,
        });
    });
});

//EDIT ==>
//GET ==> prefill the data from the model and show form to user
router.get('/:id/edit', function(req, res){
    User.findByPk(req.params.id).then((user) => {
	    res.render('users/edit.ejs', { //render views/edit.ejs & //pass in an object that contains
            user: user,
        });
    });
});

//PUT ==> update the data in our model
router.put('/:id', (req, res) => { //:index is the index of our users array that we want to change
	User.update(req.body, { //in our users array, find the index that is specified in the url (:index).  Set that element to the value of req.body (the input data)
        where: {id: req.params.id},
        returning: true,
    }).then((user)=>{
        res.redirect('/users'); //redirect to the index page
    });   
});

//DELETE ==> delete single object (Similar to get /fruits/:index on line 25)
router.delete('/:id', (req,res)=>{
    User.destroy({ where: {id: req.params.id} }).then(() => {
        console.log(req.params.id);
        res.redirect('/users')
    });
});

// GET ==> Fruits index Page
router.get('/', (req,res)=>{
    res.render('index.ejs', {
        fruits: fruits
    });
});
// 
module.exports = router;
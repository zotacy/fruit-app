const express = require('express');
const router = express.Router();
const users = require('../users.js');

// Routes
router.get("/", (req,res)=>{
    res.render("users/index.ejs") //Render automaticatilly calls on views
});
// SIGN-UP
//GET ==> Sign-up Page
router.get('/signup', (req,res)=>{
    res.render('users/signup.ejs');
})
//POST ==> Create a new user
router.post('/', (req,res)=> {
    users.push(req.body);
    res.redirect(`/users/profile/${users.length - 1}`);
});
//GET ==> Profile
router.get('/profile/:index', (req,res) =>{
    res.render('users/profile.ejs',{
        user: users[req.params.index],
        index: req.params.index
    })
})

//Login
//GET ==> Login Page
router.get('/login', (req,res)=>{
    res.render('users/login.ejs');
})
//GET ==> Profile Page
router.get('/:index', (req,res)=>{
    users[req.params.index]
    res.render('users/profile.ejs'),{
        user: users[req.params.index]
    };
})

//EDIT ==>
//GET ==> prefill the data from the model and show form to user
router.get('/:index/edit', function(req, res){
	res.render(
		'edit.ejs', //render views/edit.ejs
		{ //pass in an object that contains
			user: users[req.params.index], //the users object
			index: req.params.index //... and its index in the array
		}
	);
});

//PUT ==> update the data in our model
router.put('/:index', (req, res) => { //:index is the index of our users array that we want to change
	users[req.params.index] = req.body; //in our users array, find the index that is specified in the url (:index).  Set that element to the value of req.body (the input data)
	res.redirect('/users'); //redirect to the index page
});

//DELETE ==> delete single object (Similar to get /fruits/:index on line 25)
router.delete('/:index', (req,res)=>{
    users.splice(req.params.index, 1)
    res.redirect('/users')
});

// GET ==> Fruits index Page
router.get('/', (req,res)=>{
    res.render('index.ejs', {
        fruits: fruits
    });
});
// 
module.exports = router;
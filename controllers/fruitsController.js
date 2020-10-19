const express= require('express');
const router = express.Router();

const fruits = require('../models/fruits.js')

//GET ==> this is our homepage
//user can click on the url to create a new fruit
router.get('/', (req,res)=>{
    res.render('index.ejs', {
        fruits: fruits
    });
});

//POST ==> Create a new fruit
router.post('/', (req,res)=> {
    // if the user click on the check button in the new.ejs then set true
    //request readyToEat key to true
    if (req.body.readyToEat === 'on'){
        req.body.readyToEat = true
    } else {
        req.body.readyToEat = false
    }
    fruits.push(req.body);
    res.redirect('/fruits') //redirects back to homepage & re-renders page
});

module.exports = router;

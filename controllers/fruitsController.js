const express= require('express');
const router = express.Router();
const fruits = require('../fruits.js')

//GET ==> this is our homepage
//user can click on the url to create a new fruit
router.get('/', (req,res)=>{
    res.render('index.ejs', {
        fruits: fruits
    });
});

//GET ==> show form to user
router.get('/new', (req,res)=>{
    res.render('new.ejs');
})
//GET ==> get single object
router.get('/:index',(req,res)=>{
    res.render('show.ejs',{
        fruit: fruits[req.params.index]
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

//DELETE ==> delete single object (Similar to get /fruits/:index on line 25)
router.delete('/:index', (req,res)=>{
    fruits.splice(req.params.index, 1)
    res.redirect('/fruits')
});

//EDIT ==>
//GET ==> prefill the data from the model and show form to user
router.get('/:index/edit', function(req, res){
	res.render(
		'edit.ejs', //render views/edit.ejs
		{ //pass in an object that contains
			fruit: fruits[req.params.index], //the fruit object
			index: req.params.index //... and its index in the array
		}
	);
});

//PUT ==> update the data in our model
router.put('/:index', (req, res) => { //:index is the index of our fruits array that we want to change
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }
	fruits[req.params.index] = req.body; //in our fruits array, find the index that is specified in the url (:index).  Set that element to the value of req.body (the input data)
	res.redirect('/fruits'); //redirect to the index page
});


module.exports = router;

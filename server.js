const express = require('express');
const app = express();

const methodOverride = require('method-override'); //Used to delete
app.use(methodOverride('_method'));

const fruits = require('./models/fruits.js');

//middleware
app.use((req,res,next) => {
    console.log('I run for all routes')
    next()
});
app.use(express.urlencoded({extended:true}));
app.use("/fruits", require("./controllers/fruitsController.js"));

//GET ==> show form to user
app.get('/fruits/new', (req,res)=>{
    res.render('new.ejs');
})
//GET ==> get single object
app.get('/fruits/:index',(req,res)=>{
    res.render('show.ejs',{
        fruit: fruits[req.params.index]
    });
});

//DELETE ==> delete single object (Similar to get /fruits/:index on line 25)
app.delete('/fruits/:index', (req,res)=>{
    fruits.splice(req.params.index, 1)
    res.redirect('/fruits')
});

//EDIT ==>
//GET ==> prefill the data from the model and show form to user
app.get('/fruits/:index/edit', function(req, res){
	res.render(
		'edit.ejs', //render views/edit.ejs
		{ //pass in an object that contains
			fruit: fruits[req.params.index], //the fruit object
			index: req.params.index //... and its index in the array
		}
	);
});

//PUT ==> update the data in our model
app.put('/fruits/:index', (req, res) => { //:index is the index of our fruits array that we want to change
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }
	fruits[req.params.index] = req.body; //in our fruits array, find the index that is specified in the url (:index).  Set that element to the value of req.body (the input data)
	res.redirect('/fruits'); //redirect to the index page
});


//LISTEN
app.listen (3000, ()=>{
    console.log("I'm listening...");
});
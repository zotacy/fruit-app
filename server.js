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

//Refactored body into fruitsController.js


//LISTEN
app.listen (3000, ()=>{
    console.log("I'm listening...");
});
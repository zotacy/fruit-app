const express = require('express');
const app = express();

const methodOverride = require('method-override'); //Used to delete
app.use(methodOverride('_method'));
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

app.use("/fruits", require("./controllers/fruitsController.js"));
app.use("/users", require("./controllers/usersController.js"));

//LISTEN
app.listen (3000, ()=>{
    console.log("I'm listening...");
});
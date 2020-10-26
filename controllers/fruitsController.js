const express= require('express');
const router = express.Router();
// const fruits = require('../fruits.js')
const Fruit = require('../models').Fruit;

//GET ==> this is our homepage database
router.get("/", (req, res) => {
    Fruit.findAll().then((fruits) => {
      res.render("index.ejs", {
        fruits: fruits,
      });
    });
  });

//GET ==> show form to user
router.get('/new', (req,res)=>{
    res.render('new.ejs');
})
//GET ==> get single object
router.get("/:id", (req, res) => {
    Fruit.findByPk(req.params.id).then((fruit) => {
      res.render("show.ejs", {
        fruit: fruit,
      });
    });
});

//POST ==> Create a new fruit
router.post("/", (req, res) => {
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }

  Fruit.create(req.body).then((newFruit) => {
    res.redirect("/fruits");
  });
});

//EDIT ==>
//GET ==> prefill the data from the model and show form to user
router.get("/:id/edit", function (req, res) {
    Fruit.findByPk(req.params.id).then((fruit) => {
      res.render("edit.ejs", {
        fruit: fruit,
      });
    });
});

//PUT ==> update the data in our model
router.put("/:id", (req, res) => {
    console.log("Calling put method")
    if (req.body.readyToEat === "on") {
      req.body.readyToEat = true;
    } else {
      req.body.readyToEat = false;
    }
    Fruit.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    }).then((fruit) => {
      res.redirect("/fruits");
    });
});

//DELETE ==> delete single object (Similar to get /fruits/:index on line 25)
router.delete("/:id", (req, res) => {
    Fruit.destroy({ where: { id: req.params.id } }).then(() => {
      res.redirect("/fruits");
    });
});

module.exports = router;

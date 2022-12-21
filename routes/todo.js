const express = require("express")
const router = express.Router()
const mongoose = require("mongoose");
const Users = require("../models/Users.js")


router.use((req, res, next) => {
  console.log(`REQUEST FROM: ${req.headers['x-forwarded-for']}`)
  next()
})

router.get("/db", (req, res) => {
  Users.find()
    .then((data) => {
      res.send(data);
    })
})

router.post("/find", (req, res) => {
  const username = req.body.username;

    Users.find({"username": username})
     .then((data) => {
        res.end(`${data[0]["todo"]}`);
     })
})

// adding a todo to a user
router.post("/add", (req, res) => {
  const username = req.body.username;
  const todo = req.body.todo; // The todo they want to add

  let todos = []; // contains the todos they already had + todo they want to add

  Users.find({"username": username})
    .then((data) => {
      const dbTodos = data[0]["todo"]
      todos = dbTodos; // the todos that already exists
      todos.push(todo);

    //this will add elements
    Users.findOne({"username": username})
      .then((user) => {
          user.todo = todos;
          user.save();
          res.end(`Todo added: ${todos}`);
    })

    }).catch((err) => console.log(`!ERROR: ${err}!`))
})

router.post("/delete", (req, res) => {
  const username = req.body.username
  const todo = req.body.todo;

  Users.findOneAndUpdate({"username": username},{
    $pull: {
      "todo": todo
    },
  }).then((d) => res.end("Todo deleted"))
})

module.exports = router;
const express = require("express")
const router = express.Router()
const Todo = require("../models/Todo.js");
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
    })

    const filter = { "username": username };
    const update = { "todo": todos };

    Users.findOneAndUpdate(filter, update)
    .then(() => {
      res.end(`Updated todos and added: ${todo}. Total: ${todos}`) // output
    })
    .catch((err) => {
      console.log(err);
    })

    
})

module.exports = router;
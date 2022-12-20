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

  let todos = [];

  Users.find({"username": username})
    .then((data) => {
      todos = data[0]["todo"]
      res.end(`${todos}`)
    })

  { $push: { <todo>: , ... } }
})

module.exports = router;
const express = require("express")
const router = express.Router()
const Todo = require("../models/Todo.js");
const mongoose = require("mongoose");
const Users = require("../models/Users.js")

router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  console.log("someone sent a request")
  next()
})

router.get("/DB", (req, res) => {
  Users.find()
    .then((data) => {
      res.send(data);
    })
})

router.post("/add", (req, res) => {
    const todo = req.body.todo;

    const todoItem = new Todo({
        todo: todo
    })

    todoItemo.save()
      .then((res) => {
          console.log("Added todo to DB")
      })
    
    res.end("Added todo");
})

module.exports = router;
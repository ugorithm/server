const express = require("express");
const router = express.Router();
const Users = require("../models/Users.js");
const mongoose = require("mongoose");

router.use((req, res, next) => {
  
  console.log('Time: ', Date.now());
  console.log("someone sent a request");
  next();
})

router.get("/DB", (req, res) => {
  Users.find()
    .then((data) => {
      res.send(data);
    })
})

router.post("/add", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const pr = req.body.pr;
    const todo = req.body.todo;
    
    const user = new Users({
      username: username,
      password: password,
      todo: todo,
      pr: pr
    })

    user.save()
      .then((res) => {
        console.log("Added user to DB")
      })
    res.end("Added user");
})

module.exports = router;
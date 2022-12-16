const express = require("express")
const router = express.Router()
const prTracker = require("../models/prTracker.js");
const mongoose = require("mongoose");
const Users = require("../models/Users.js");

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

router.post("/find", (req, res) => {
  const name = req.body.username;

  Users.findOne({"username": name})
    .then((data) => {
      res.send(data["pr"]);
    })
})

module.exports = router;
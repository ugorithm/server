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

router.post("/add", (req, res) => {
  const username = req.body.username; // their username
  const todo = req.body.todo; // their todo to add

  Users.findOneAndUpdate({"username": username},
  {
    $push: { // add their todo to the existing Array of their todo's
      "todo": todo
    },
  }).then(() => res.end("Added todo"))
    .catch((err) => console.log(`ERROR: ${err}`));
});

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
const asyncHandler = require("express-async-handler");
const Users = require("../models/Users");
const user = require("../middleware/authMiddleware.js")
const express = require("express")

exports.viewDb = asyncHandler(async (req, res) => {
  // Users.find().select("username password todo")
  //   .then((data) => {
  //     res.send(data);
  //   });
});

exports.findTodo = asyncHandler(async (req, res) => {
  const userID = req.userID;
  const user = await Users.findById(userID).select("-password")
  res.send(user);
});

exports.addTodo = asyncHandler(async (req, res) => {
  const username = req.body.username; // their username
  const todo = req.body.todo; // their todo to add

  await Users.findOneAndUpdate({"username": username},
  {
    $push: { // add their todo to the existing Array of their todo's
      "todo": todo
    },
  }).then(() => res.end(`Added todo ${todo}`))
    .catch((err) => console.log(`ERROR: ${err}`));
})

exports.deleteTodo = (req, res) => {
  const username = req.body.username
  const todo = req.body.todo;

  Users.findOneAndUpdate({"username": username},{
    $pull: {
      "todo": todo
    },
  }).then((d) => res.end("Todo deleted"))
}
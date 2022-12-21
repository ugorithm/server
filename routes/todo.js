const express = require("express")
const router = express.Router()
const mongoose = require("mongoose");
const Users = require("../models/Users.js")

const { viewDb, findTodo, addTodo, deleteTodo } = require("../controllers/todo");

router.use((req, res, next) => {
  console.log(`REQUEST FROM: ${req.headers['x-forwarded-for']}`)
  next()
})

router.get("/db", viewDb);

router.post("/find", findTodo);

router.post("/add", addTodo);

router.post("/delete", deleteTodo);

module.exports = router;
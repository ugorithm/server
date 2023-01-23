const express = require("express")
const router = express.Router()
const mongoose = require("mongoose");
const Users = require("../models/Users.js")

// controllers
const { viewDb, findTodo, addTodo, deleteTodo } = require("../controllers/todoController");

// middleware
const { checkAuth } = require("../middleware/authMiddleware");

// routes
router.get("/db", viewDb);

router.post("/find", findTodo);

router.post("/add", addTodo);

router.post("/delete", deleteTodo);

module.exports = router;
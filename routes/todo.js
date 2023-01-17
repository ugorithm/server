const express = require("express")
const router = express.Router()
const mongoose = require("mongoose");
const Users = require("../models/Users.js")

// controllers
const { viewDb, findTodo, addTodo, deleteTodo } = require("../controllers/todoController");

// middleware
const { checkAuth } = require("../middleware/authMiddleware");

// routes
router.get("/db", checkAuth, viewDb);

router.post("/find", checkAuth, findTodo);

router.post("/add", checkAuth, addTodo);

router.post("/delete", checkAuth, deleteTodo);

module.exports = router;
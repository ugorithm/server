const express = require("express")
const router = express.Router()
const mongoose = require("mongoose");
const Users = require("../models/Users.js")

// controllers
const { viewDb, findTodo, addTodo, deleteTodo } = require("../controllers/todoController");

// middleware
const { protectRoute } = require("../middleware/authMiddleware");

// routes
router.get("/db", viewDb);

router.post("/find", findTodo);

router.post("/add", protectRoute, addTodo);

router.post("/delete", protectRoute, deleteTodo);

module.exports = router;
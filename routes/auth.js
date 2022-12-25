const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Users = require("../models/Users.js");

const { login, register } = require("../controllers/authController.js")

router.use((req, res, next) => {
  console.log(`AUTHORISATION REQUEST`)
  next();
})

// @desc Get all user data
// @route GET /auth/db
// @access Private
router.get("/db", asyncHandler(async (req, res) => {
  Users.find()
    .then((data) => {
      res.status(200).send(data);
    })
}));

// @desc Register a user into database
// @route POST /auth/register
// @access Private
router.post("/register", register);

router.post("/login", login);

module.exports = router;
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Users = require("../models/Users.js");

const { login, register, access_key } = require("../controllers/authController.js")

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

// @desc Login a user
// @route POST /auth/login
// @access Private
router.post("/login", login);

// @desc Takes in refresh key to generate new access token
// @route /auth/accesskey
// @access Private
router.post("/accesskey", access_key);

module.exports = router;
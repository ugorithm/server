const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Users = require("../models/Users.js");

const { login, register } = require("../controllers/auth.js")

router.use((req, res, next) => {
  console.log(`AUTHORISATION REQUEST`)
  next();
})

router.get("/db", asyncHandler(async (req, res) => {
  Users.find()
    .then((data) => {
      res.status(200).end(`${data}`)
    })
}));

router.post("/register", register);

router.post("/login", login);

module.exports = router;
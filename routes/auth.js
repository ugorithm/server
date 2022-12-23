const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const { db, addUser } = require("../controllers/user.js");
const { login } = require("../controllers/auth.js")

router.use((req, res, next) => {
  console.log(`AUTHORISATION REQUEST`)
  next();
})

router.get("/db", db);

router.post("/user/add", addUser);


router.post("/login", login)

module.exports = router;
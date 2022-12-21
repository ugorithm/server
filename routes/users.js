const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const { db, addUser } = require("../controllers/users");

router.use((req, res, next) => {
  console.log(`REQUEST INCOMING: ${req.headers['x-forwarded-for']}`)
  next();
})

router.get("/db", db);

router.post("/add", addUser);

module.exports = router;
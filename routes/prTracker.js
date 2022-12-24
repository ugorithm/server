const express = require("express")
const router = express.Router()
const mongoose = require("mongoose");
const Users = require("../models/Users.js");

const { db, findPR, updatePR } = require("../controllers/prTracker.js")

router.use((req, res, next) => {
  console.log("PR TRACKER REQUEST")
  next()
})

router.get("/db", db)

router.post("/find", findPR)

router.post("/update", updatePR)

module.exports = router;
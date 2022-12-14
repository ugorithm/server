const express = require("express")
const router = express.Router()
const prTracker = require("../models/prTracker.js");
const mongoose = require("mongoose");

router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  console.log("someone sent a request")
  next()
})

router.get("/DB", (req, res) => {
  prTracker.find()
       .then((data) => {
      res.send(data);
    })
})

router.post("/add", (req, res) => {
    const squat = req.body.squat;
    const bench = req.body.squat;
    const deadlift = req.body.squat;
    
    const prTracker = new prTracker({
        squat: squat,
        bench: bench,
        deadlift: deadlift
    })
    
    prTracker.save()
      .then((res) => {
          console.log("Added todo to DB")
      })
    res.end("Added todo");
})

module.exports = router;
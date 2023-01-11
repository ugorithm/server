const Users = require("../models/Users");
const mongoose = require("mongoose")

exports.db = (req, res) => {
  Users.find()
    .then((data) => {
      res.send(data);
    }).catch((err) => console.log(err))
}

exports.findPR = (req, res) => {
  const name = req.body.username;

  Users.find({"username": name})
    .then((data) => {
      res.end("Check console")
      console.log(data[0]["pr"]);
    })
}

exports.updatePR = (req, res) => {
  const username = req.body.username;
  const pr = req.body.pr;
        
  Users.findOneAndUpdate({"username": username}, {$set:{pr: pr}})  
    .then(() => res.end("pr updated"))
}
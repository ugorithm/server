const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reqString = {
  type: String,
  required: true,
};

const nonReqInt = {
  type: Number,
  required: false,
};

const prSchema = new mongoose.Schema({
  squat: nonReqInt,
  bench: nonReqInt,
  deadlift: nonReqInt
})

const userSchema = new Schema({
   username: reqString,
   password: reqString,
  todo: [String],
  prSchema: prSchema
});

module.exports = mongoose.model("Users", userSchema);
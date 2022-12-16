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

const userSchema = new Schema({
   username: reqString,
   password: reqString,
  todo: [String],
   pr: [{
    squat: nonReqInt,
    bench: nonReqInt,
    deadlift: nonReqInt
   }],
});

module.exports = mongoose.model("Users", userSchema);
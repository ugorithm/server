const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
   username: {type: String, required: true},
   password: {type: String, required: true},
   todos: {type: Object, required: false},
   pr: {type: Object, required: false}
});

module.exports = mongoose.model("Users", userSchema);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prTrackerSchema = new Schema({
    squat: {type: Number, required: true},
    bench: {type: Number, required: true},
    deadlift: {type: Number, required: true}
});

module.exports = mongoose.model("prTracker", prTrackerSchema);
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); // mongodb library
const cors = require("cors");
require('dotenv').config();

//routers
const userRouter = require("./routes/auth.js")
const todoRouter = require("./routes/todo.js")
const prTracker = require("./routes/prTracker.js")

const db_uri = process.env['mongo_uri'];

// connect to mongodb
const { MongoClient, ServerApiVersion } = require('mongodb');
const MONGO_PORT = 6001;
mongoose
  .connect(db_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(MONGO_PORT, () => console.log(`Mongo DB Running on: ${MONGO_PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

const app = express();

// extensions
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// routes
app.use("/auth", userRouter);
app.use("/todo", todoRouter);
app.use("/pr", prTracker)
const port = 3000;

app.get("/", (req, res) => {
  res.send("Server dashboard")
});

app.listen(port, (res, req) => {
  console.log(`Server running on port ${port}`)
});

module.exports = app;

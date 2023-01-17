const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); // mongodb library
const cors = require("cors");
require('dotenv').config();
const session = require("express-session");
const bcrypt = require("bcrypt");
const store = new session.MemoryStore();

//routers
const userRouter = require("./routes/auth.js")
const todoRouter = require("./routes/todo.js")
const prTracker = require("./routes/prTracker.js")

const db_uri = process.env['mongo_uri'];

// connect to mongodb
const { MongoClient, ServerApiVersion } = require('mongodb');
const expressAsyncHandler = require('express-async-handler');
const Users = require('./models/Users.js');
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

const corsConfig = {
  credentials:true
}
app.use(cors(corsConfig));
app.use(session({
  secret: "Test secret",
  cookie: { maxAge: 120000, httpOnly: false }, // change httpOnly to true on production
  saveUninitialized: false,
  store: store
}));

// routes
app.use("/auth", userRouter);
app.use("/todo", todoRouter);
app.use("/pr", prTracker)
const port = 3001;

app.get("/", (req, res) => {
  res.send("Server dashboard")
});



app.listen(port, (res, req) => {
  console.log(`Server running on port ${port}`)
});
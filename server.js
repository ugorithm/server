const express = require('express');
const bodyParser = require("body-parser");
const helmet = require("helmet");
const mongoose = require("mongoose"); // mongodb library
const cors = require("cors");

//routers
const userRouter = require("./routes/users.js")
const todoRouter = require("./routes/todo.js")
const prTracker = require("./routes/prTracker.js")

const db_uri = process.env['mongo_uri']

// connect to mongodb
const { MongoClient, ServerApiVersion } = require('mongodb');
const PORT = 6001;
mongoose
  .connect(db_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    console.log("CONNECTED TO DB")
    
  })
  .catch((error) => console.log(`${error} did not connect`));

const app = express();

// extensions
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
  origin: "https://3f51-81-104-171-200.eu.ngrok.io",
}))

// routes
app.use("/users", userRouter);
app.use("/todo", todoRouter);
app.use("/pr", prTracker)
const port = 3000;

app.get("/", (req, res) => {
  res.send("The Server")
})

app.post("/task", (req, res) => {
  const id = req.body.id;
  const task = req.body.task;
  res.end("Added todo item to database")
})

app.listen(port, (res, req) => {
  console.log(`Running on port ${port}`)
})


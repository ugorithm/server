const express = require('express');
const bodyParser = require("body-parser");
const helmet = require("helmet");

const app = express();

// plugins
app.use(helmet.noSniff());
app.use(bodyParser.json())

const port = 3000;
const path = require('path');


app.get('/', (req, res) => {
  res.send({"status": "active"})
})

app.listen(port, (res, req) => {
  console.log(`Running on port ${port}`)
})
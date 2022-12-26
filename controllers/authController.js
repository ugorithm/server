const Users = require("../models/Users.js");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const ACCESS_TOKEN_KEY = process.env["ACCESS_TOKEN_KEY"];
const REFRESH_TOKEN_KEY = process.env["REFRESH_TOKEN_KEY"];

exports.login = asyncHandler(async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    const user = await Users.findOne({"username": username});

    if (user && (await bcrypt.compare(password, user.password))) { // user.password is the encrypted password
      res.status(201).send({
        _id: user.id,
        username: user.username,
        password: user.password,
        access_key: genAccessToken(user._id),
        refresh_key: genRefreshToken(user._id)
      })
    } else {
      res.status(400).send("Wrong username/password");
      throw new Error("Wrong username/password");
    }
})

const genAccessToken = (id) => {
  return jwt.sign({id}, ACCESS_TOKEN_KEY, {
    expiresIn: "5h", // after 5 hours, we request another access token
  })
}

const genRefreshToken = (id) => {
  return jwt.sign({id}, REFRESH_TOKEN_KEY, {
    expiresIn: "30d" // they have to login again
  })
}

exports.register = asyncHandler(async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    const pr = {
        "squat": 0,
        "bench": 0,
        "deadlift": 0
    };
    const todo = [];

    if (!username || !password) {
      res.status(400);
      throw new Error("Username and password required")
    }

    const userExists = await Users.findOne({username})

    if (userExists) {
      res.status(406); // Code 406: Not acceptable. Server is able to, but is not accepting the data.
      throw new Error("User already exists")
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    
    const user = new Users({
      username: username,
      password: hashedPassword,
      todo: todo,
      pr: pr
    })

    await user.save()
      .then((i) => {
        res.status(201).send("user created"); // code 201 means something is created
      })
})

exports.access_key = asyncHandler(async (req, res) => {
  const refreshKey = req.body.refresh_key;
  
  const decodedKey = jwt.verify(refreshKey, REFRESH_TOKEN_KEY);
  
  res.status(201).send({
    "access_key": genAccessToken(decodedKey.id)
  });
});
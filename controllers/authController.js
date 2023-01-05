const Users = require("../models/Users.js");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const ACCESS_TOKEN_KEY = process.env["ACCESS_TOKEN_KEY"];
const REFRESH_TOKEN_KEY = process.env["REFRESH_TOKEN_KEY"];

exports.login = asyncHandler(async(req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    if (req.session.authenticated) {
      res.status(200).json(req.session)
    } else {
      const user = await Users.find({"username": username});
      if (!user) {
        res.status(401).end("No user exists");
      }
      const result = await bcrypt.compare(password, user[0].password) // check if entered password = hashed password
      if (result === true) { // password is correct
        req.session.authenticated = true;
        req.session.user = {
          username,
          password
        };
        res.json(req.session);
      } else {
        res.status(403).send({msg: "Wrong password"}) // wrong password
      }
    }
  } else {
    res.send("NO")
  }
});

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

// generate access key endpoint
exports.access_key = asyncHandler(async (req, res) => {
  const refreshKey = req.body.refresh_key;

  if (!refreshKey) {
    res.status(404).send("No refresh key")
    console.log("No refresh key")
    return;
  }
  
  const decodedKey = jwt.verify(refreshKey, REFRESH_TOKEN_KEY);
  
  res.status(201).send({
    "access_key": genAccessToken(decodedKey.id)
  });
});
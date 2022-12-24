const Users = require("../models/Users.js");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

exports.login = asyncHandler(async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    const user = await Users.findOne({"username": username});

    if (user && (await bcrypt.compare(password, user.password))) { // user.password is the encrypted password
      res.status(201).send({
        _id: user.id,
        username: user.username,
        password: user.password,
        token: genToken(user._id)
      })
    } else {
      res.status(400).send("Wrong username/password");
      throw new Error("Wrong username/password");
    }

})

const genToken = (id) => {
  const ENCRYPT_KEY="Key123LOL"; // make this .env later
  return jwt.sign({id}, ENCRYPT_KEY, {
    expiresIn: "4h", // 4 hours until user has to log in again
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
      res.status(406);
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
        res.status(201).end("User created"); // code 201 means something is created
      })
})
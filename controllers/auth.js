const Users = require("../models/Users.js");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

exports.login = asyncHandler(async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    const user = await Users.findOne({"username": username});

    if (user && (await bcrypt.compare(password, user.password))) { // user.password is the encrypted password
      res.send({
        _id: user.id,
        username: user.username,
        password: user.password,
      })
    } else {
      res.status(400).send("Wrong username/password");
      throw new Error("Wrong username/password");
    }

})

exports.register = asyncHandler(async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const pr = {
        "squat": 0,
        "bench": 0,
        "deadlift": 0
    };
    const todo = [];

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
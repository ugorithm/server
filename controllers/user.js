const Users = require("../models/Users");
const bcrypt = require("bcrypt")

exports.db = (req, res) => {
    Users.find()
        .then((data) => {
            res.send(data);
        })
};

exports.addUser = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const pr = req.body.pr;
    const todo = req.body.todo;

    const hashedPassword = await bcrypt.hash(password, 10)
    
    const user = new Users({
      username: username,
      password: hashedPassword,
      todo: todo,
      pr: pr
    })

    user.save()
      .then((res) => {
        console.log("Added user to DB")
      })
    res.end("Added user");
}


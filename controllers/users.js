const Users = require("../models/Users");

exports.db = (req, res) => {
    Users.find()
        .then((data) => {
            res.send(data);
        })
};

exports.addUser = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const pr = req.body.pr;
    const todo = req.body.todo;
    
    const user = new Users({
      username: username,
      password: password,
      todo: todo,
      pr: pr
    })

    user.save()
      .then((res) => {
        console.log("Added user to DB")
      })
    res.end("Added user");
}
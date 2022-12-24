const Users = require("../models/Users");

exports.viewDb = (req, res) => {
  Users.find().select("username password todo")
    .then((data) => {
      res.send(data);
    });
};

exports.findTodo = (req, res) => {
  const username = req.body.username;

    Users.find({"username": username})
      .then((data) => {
        res.end(`${data[0]["todo"]}`);
    })
};

exports.addTodo = (req, res) => {
  const username = req.body.username; // their username
  const todo = req.body.todo; // their todo to add

  Users.findOneAndUpdate({"username": username},
  {
    $push: { // add their todo to the existing Array of their todo's
      "todo": todo
    },
  }).then(() => res.end(`Added todo ${todo}`))
    .catch((err) => console.log(`ERROR: ${err}`));
}

exports.deleteTodo = (req, res) => {
  const username = req.body.username
  const todo = req.body.todo;

  Users.findOneAndUpdate({"username": username},{
    $pull: {
      "todo": todo
    },
  }).then((d) => res.end("Todo deleted"))
}
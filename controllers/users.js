const Users = require("../models/Users");

exports.db = (req, res) => {
    Users.find()
        .then((data) => {
            res.send(data);
        })
}
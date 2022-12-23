const Users = require("../models/Users.js");
const bcrypt = require("bcrypt")

exports.login = async (res, req) => {
    const username = req.body.username;
    const password = req.body.password;

    res.end(username);

    // Users.find({"username": username})
    //  .then((data) => {
    //      const hashedPassword = data[0]["password"] //hashed password
    //     if (bcrypt.compare(password, hashedPassword)) {
    //         res.end("Login successful")
    //     }
         
    //  }).catch((err) => console.log(err));

}

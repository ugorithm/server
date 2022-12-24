const Users = require("../models/Users.js");
const bcrypt = require("bcrypt")

exports.login = async (req, res) => { // temp address: https://b63b-81-104-171-200.eu.ngrok.io

    const username = req.body.username;
    const password = req.body.password;
    
    Users.find({"username": username})
     .then((data) => {
         const hashedPassword = data[0]["password"] //hashed password
         
         if (bcrypt.compareSync(password, hashedPassword)){
            res.send({
              "id": data[0]["_id"],
              "username": username,
              "password": password,
              "hashedPass": hashedPassword
            });
         }
         else {
            res.send("login failed");
         }
         
     }).catch((err) => console.log("ERROR"));

}

exports.register = async (req, res) => {
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

    user.save()
      .then((res) => {
        console.log(`Added user ${username}`)
      })
    res.end("Added user");
}
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Users = require("../models/Users");
require("dotenv").config();

const checkAuth = asyncHandler(async (req, res, next) => {
    if (!req.headers.authorization) {
        res.send("Unauthorized")
    };
    const SID = req.headers.authorization?.split(" ")[1]

    req.sessionStore.get(SID, async (err, session) => {
      if (!session) {
        res.status(401).json({"authenticated": false})
      } else {
        userID = session.user.userID;
        return userID
        }
    })
  
    next();
});

module.exports = { checkAuth };
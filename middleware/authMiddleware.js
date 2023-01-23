const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Users = require("../models/Users");
require("dotenv").config();

const checkAuth = asyncHandler(async (req, res, next) => {
  if (!req.headers?.authorization) {
    res.send("Unauthorized");
  }
  const SID = req.headers.authorization?.split(" ")[1];

  req.sessionStore.get(SID, async (err, session) => {
    if (err) console.log(err + "Error");

    if (!session) {
      res.status(401).json({ authenticated: false });
    } else {
      const userID = session.user.userID;
      req.userID = userID;
      next();
    }
  });

  // next(); used to be here
});

module.exports = { checkAuth };

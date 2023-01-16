const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Users = require("../models/Users");
require("dotenv").config();

const checkAuth = asyncHandler(async (req, res, next) => {
    if (!req.headers.authorization) {
        res.send("Unauthorized")
    };
    const token = req.headers.authorization?.split(" ")[1]
    console.log(token);
    next();
});

module.exports = { checkAuth };
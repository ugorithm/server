const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Users = require("../models/Users");

const ENCRYPT_KEY="Key123LOL"; // make this .env later

const protectRoute = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]; // Turns header into array seperating between the space: Bearer token. Takes just token

            //verify token
            const decoded = jwt.verify(token, ENCRYPT_KEY);

            // find user from token
            req.user = await Users.findById(decoded.id).select("-password") // doesn't show user's password

            next();
        } catch (err) {
            console.log(`ERROR: ${err}`)
            res.status(401).send("Not authorised") // code 401 - not authorised
        }
    }

    // if token doesn't exist
    if (!token) {
        res.status(401).send("Not authorised, no token") // code 401 - not authorised
    }
});

module.exports = { protectRoute };
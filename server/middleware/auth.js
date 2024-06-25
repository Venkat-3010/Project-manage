const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

const auth = async (req, res, next) => {
  // console.log("authorization", req.header("Authorization"));
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try{
    const { _id }  = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = _id;
    next()
  }catch(error){
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired", isTokenExpired: true });
    }
    console.log("Error: ", error);
    return res.status(400).json({ message: "Invalid token", isTokenInvalid: true });
  }
};

module.exports = auth;
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

const auth = async (req, res) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try{
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(id);
    req.user = user;
  }catch(error){
    console.log("Error: ", error);
    return res.status(400).json({ message: "Invalid token", isTokenInvalid: true });
  }
};

module.exports = auth;
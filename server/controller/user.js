const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const formattedEmail = email.toLowerCase();
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const existingUser = await User.findOne({ email: formattedEmail });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email: formattedEmail,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({ message: "registered Successfully" });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const formattedEmail = email.toLowerCase();
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const user = await User.findOne({ email: formattedEmail });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({
      message: "User logged in successfully",
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateUserProfile = async (req, res) => {
  // console.log("Update User Profile", req.body)
  const { name, email, password, oldPassword } = req.body;
  try{
    const user = await User.findById(req.userId);
    if(!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    if(oldPassword){
      const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
      if(!isPasswordCorrect){
        return res.status(400).json({ message: "Invalid credentials" });
      }
    }

    if(name){
      user.name = name;
    }
    if(email){
      user.email = email;
    }
    if(password){
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password =  hashedPassword;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  }catch(error){
    console.log("Error: ", error);
    res.status(500).json({ message: error.message });
  }
}

const addPerson = async (req, res) => {
  const { email } = req.body;
  try{
    const user = await User.findById(req.userId);
    if(!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.people.push(email);
    const people = user.people;
    await user.save();
    res.status(200).json({ message: "Person added successfully", people: user.people });
  }catch(error){
    console.log("Error: ", error);
    res.status(500).json({ message: error.message });
  }
}

const getPeople = async (req, res) => {
  try{
    const user = await User.findById(req.userId);
    if(!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ people: user.people });
  }catch(error){
    console.log("Error: ", error);
    res.status(500).json({ message: error.message });
  }
}

const getUser = async (req, res) => {
  try{
    const user = await User.findById(req.userId);
    if(!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user: user });
  }catch(error){
    console.log("Error: ", error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  registerUser,
  loginUser,
  updateUserProfile,
  addPerson,
  getPeople,
  getUser,
};

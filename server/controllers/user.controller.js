const router = require("express").Router();

// Importing User model to get access to the schema
const User = require("../models/user.model");

// Requiring in bcrypt dependency
const bcrypt = require("bcrypt");

// Requiring in jsonwebtoken dependency
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT;

// -------- SIGNUP ENDPOINT ------------

// Creating a signup endpoint that uses bcrypt to hash the password and the email
// http://localhost:4040/user/signup
router.post("/signup", async (req, res) => {
  try {
    // Creating a new User object based off of the User Schema
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      //   email: bcrypt.hashSync(req.body.email, 10), // Hashed tested and working // have to figure out a way to compare email in the login endpoint
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10), // Hashed tested and working
    });
    const newUser = await user.save();

    // Creating a token using the sign method of jwt.
    const token = jwt.sign({ id: user._id }, SECRET, {
      expiresIn: "1 day",
    });
    res.status(200).json({
      user: newUser,
      message: "Success! User Created!",
      token,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// -------- LOGIN ENDPOINT ------------

// Creating a login endpoint that will use bcrypt's compare method to check both email and password
// http://localhost:4040/user/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Using .findOne method to go through the database
    const user = await User.findOne({
      email: email,
    });
    // console.log(user); // findOne by email works.

    // Writing an error response to catch if no user is found
    if (!user) throw new Error("Email or password does not match."); // Tested with fake email and error message was displayed

    const passwordMatch = await bcrypt.compare(password, user.password);
    // console.log(passwordMatch);

    if (!passwordMatch) throw new Error("Email or password does not match.");

    // After verification, provide a new jwt token
    const token = jwt.sign({ id: user._id }, SECRET, {
      expiresIn: 60 * 60 * 24,
    });

    res.status(200).json({
      message: "Login Successful!",
      user,
      token,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
module.exports = router;

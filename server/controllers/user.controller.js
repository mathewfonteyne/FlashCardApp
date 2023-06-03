const router = require("express").Router();

// Importing User model to get access to the schema
const User = require("../models/user.model");

// Requiring in bcrypt dependency
const bcrypt = require("bcrypt");

// Requiring in jsonwebtoken dependency
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT;

// Creating a signup endpoint that uses bcrypt to hash the password and the email
router.post("/signup", async (req, res) => {
  try {
    // Creating a new User object based off of the User Schema
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: bcrypt.hashSync(req.body.email, 10), // Hashed tested and working
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

module.exports = router;

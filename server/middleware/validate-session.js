//Bringing in jsonwebtoken to access its tokens methods/functionality
const jwt = require("jsonwebtoken");

// Bringing in the User model to reference
const User = require("../models/user.model");

// Building middleware function to
const validateSession = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const decodedToken = await jwt.verify(token, process.env.JWT);

    const user = await User.findById(decodedToken.id);
    if (!user) throw new Error("User not found!");

    req.user = user;

    return next();
  } catch (err) {
    res.json({
      error: err.message,
    });
  }
};

// Exporting the function to be accessed via endpoints
module.exports = validateSession;

const User = require("../models/user.model");
const mongoose = require("mongoose");
const { ValidationError, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

module.exports.create = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch(error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).json(error.errors);
    } else {
      next(error);
    }
  }
}

const sessions = [];

module.exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findOne({ email: req.body.email });
    
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const match = await user.checkPassword(req.body.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid password" });
    }

    //con jwt
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {expiresIn: "1h"});
    res.set("Set-Cookie", `${token}; HttpOnly`);
    res.status(200).json({ token });

  } catch(error) {
    res.status(401).json({ message: "invalid email" });
  }
}
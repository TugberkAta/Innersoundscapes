const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const uuid = require("uuid");

exports.register_user_post = asyncHandler(async (req, res, next) => {
  try {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        throw err;
      }
      const user = new User({
        uuid: uuid.v4(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: hashedPassword,
        membership: "Basic",
        adminStatus: false,
      });
      const result = await user.save();
      res.redirect("http://localhost:5173/register");
    });
  } catch (err) {
    return next(err);
  }
});

const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const uuid = require("uuid");

//Validate user form, hash and save it to mongodb
exports.register_user_post = [
  body("password", "Password field has to be filled")
    .isString()
    .trim()
    .notEmpty()
    .isLength({ min: 8 }),
  body("firstName", "First name field has to be filled")
    .isString()
    .trim()
    .notEmpty(),
  body("lastName", "Last name field has to be filled")
    .isString()
    .trim()
    .notEmpty(),
  body("username", "Username field has to be filled")
    .isString()
    .trim()
    .notEmpty()
    .custom(async (value) => {
      const existingUser = await User.findOne({ username: value });
      if (existingUser) {
        throw new Error("Username already exists");
      }
    }),

  asyncHandler(async (req, res, next) => {
    console.log(validationResult(req));
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log("error while validating in the backend");
      res.redirect("http://localhost:5173/register");
      return;
    }
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
  }),
];

//Sign in as a user
exports.sign_in_post = [
  body("username")
    .isString()
    .trim()
    .notEmpty()
    .custom(async (value, { req }) => {
      const user = await User.findOne({ username: value }).exec();
      if (!user) {
        throw new Error("Username Does Not Exist");
      }
      return user;
    }),
  body("password").isString().trim().notEmpty(),

  asyncHandler(async (req, res, next) => {
    console.log(validationResult(req));
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log("error");
      return;
    }
    try {
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          console.error("Authentication error:", err);
          return 0;
        }
        if (!user) {
          console.log("Authentication failed:", info.message);
          return res.send("");
        }
        // Log successful authentication
        console.log("User authenticated successfully:", user.username);
        req.logIn(user, (err) => {
          if (err) {
            console.error("Error logging in user:", err);
            return 0;
          }
          res.send("");
        });
        console.log(req.user);
        console.log(req.isAuthenticated());
      })(req, res, next);
    } catch (err) {
      console.error("Error during authentication:", err);
      return next(err);
    }
  }),
];

exports.user_info_all_get = asyncHandler(async (req, res, next) => {
  const allUsers = await User.find().exec();

  res.send(allUsers);
});

exports.user_info_current_get = asyncHandler(async (req, res, next) => {
  res.send(req.user);
});

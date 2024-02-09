var express = require("express");
var router = express.Router();
const user = require("../models/user");
const user_controller = require("../controllers/user_controller");

/* GET users listing. */
router.post("/register", user_controller.register_user_post);

module.exports = router;

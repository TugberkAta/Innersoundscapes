var express = require("express");
var router = express.Router();
const user_controller = require("../controllers/user_controller");

router.post("/register", user_controller.register_user_post);

router.patch("/register-admin/:id", user_controller.update_admin_patch);

router.post("/log-in", user_controller.sign_in_post);

router.get("/info", user_controller.user_info_all_get);

router.get("/current", user_controller.user_info_current_get);

module.exports = router;

var express = require("express");
var router = express.Router();
const article_controller = require("../controllers/article_controller");

router.post("/create-article", article_controller.register_article_post);

router.get("/all", article_controller.all_articles_get);

module.exports = router;

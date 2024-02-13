var express = require("express");
var router = express.Router();
const article_controller = require("../controllers/article_controller");

router.post("/create-article", article_controller.register_article_post);

router.get("/all", article_controller.all_articles_get);

router.get("/alternative", article_controller.alternative_articles_get);

router.get("/psychedelia", article_controller.psychedelia_articles_get);

router.get("/progressive", article_controller.progressive_articles_get);

router.get("/punk", article_controller.punk_articles_get);

router.get("/turkish-scene", article_controller.turkish_scene_articles_get);

module.exports = router;

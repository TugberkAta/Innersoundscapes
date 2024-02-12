const asyncHandler = require("express-async-handler");
const Article = require("../models/article");
const { body, validationResult } = require("express-validator");
const uuid = require("uuid");

exports.register_article_post = [
  body("firstName", "First name field has to be filled")
    .isString()
    .trim()
    .notEmpty(),
  body("lastName", "Last name field has to be filled")
    .isString()
    .trim()
    .notEmpty(),
  body("articleHeader", "Header field has to be filled")
    .isString()
    .trim()
    .notEmpty(),
  body("imgUrl", "Img url must be filled").isString().trim().notEmpty(),

  asyncHandler(async (req, res, next) => {
    console.log(validationResult(req));
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log("error while validating in the backend");
      res.redirect("http://localhost:5173/create-article");
      return;
    }
    try {
      const sanitizedImgAlt = req.body.imgAlt
        .toLowerCase()
        .replace(/\s+/g, "-");

      const article = new Article({
        uuid: uuid.v4(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        articleHeader: req.body.articleHeader,
        mainBody: req.body.mainBody,
        imgUrl: req.body.imgUrl,
        imgAlt: sanitizedImgAlt,
      });
      const result = await article.save();
      res.redirect("http://localhost:5173/create-article");
    } catch (err) {
      console.error("Error saving article:", err);
      res.status(500).send("Server Error");
    }
  }),
];

exports.all_articles_get = asyncHandler(async (req, res, next) => {
  const allArticles = await Article.find().exec();
  res.send(allArticles);
});

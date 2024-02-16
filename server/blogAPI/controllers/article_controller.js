const asyncHandler = require("express-async-handler");
const Article = require("../models/article");
const { body, validationResult } = require("express-validator");
const uuid = require("uuid");
const { DateTime } = require("luxon");

// Registering the article
exports.register_article_post = [
  // Validating data
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
  body("paragraphArray", "Need at least one paragraph in the array")
    .isArray()
    .notEmpty(),
  body("genreAlternative", "Error in tags field").optional().isBoolean(),
  body("genreProgressive", "Error in tags field").optional().isBoolean(),
  body("genrePsychedelia", "Error in tags field").optional().isBoolean(),
  body("genrePunk", "Error in tags field").optional().isBoolean(),
  body("genreTurkishScene", "Error in tags field").optional().isBoolean(),

  asyncHandler(async (req, res, next) => {
    console.log(validationResult(req));
    const errors = validationResult(req);

    // Incase of errors refresh the page
    if (!errors.isEmpty()) {
      console.log("error while validating in the backend");
      res.redirect("http://localhost:5173/create-article");
      return;
    }

    // Register the article to the database
    try {
      // sanitize the image description to be suitable for the html
      const sanitizedImgAlt = req.body.imgAlt
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");
      // put the checkbox results into an tag object
      const tagObject = {
        genreAlternative: req.body.genreAlternative,
        genreProgressive: req.body.genreProgressive,
        genrePsychedelia: req.body.genrePsychedelia,
        genrePunk: req.body.genrePunk,
        genreTurkishScene: req.body.genreTurkishScene,
      };
      const article = new Article({
        uuid: uuid.v4(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        articleHeader: req.body.articleHeader,
        mainBody: req.body.mainBody,
        imgUrl: req.body.imgUrl,
        paragraphArray: req.body.paragraphArray,
        imgAlt: sanitizedImgAlt,
        genreTag: tagObject,
        date_of_article: DateTime.now(),
      });
      const result = await article.save();
      res.redirect("http://localhost:5173/create-article");
    } catch (err) {
      console.error("Error saving article:", err);
      res.status(500).send("Server Error");
    }
  }),
];

// Updating the article
exports.update_article_patch = [
  // Validating data
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
  body("paragraphArray", "Need at least one paragraph in the array"),
  body("genreAlternative", "Error in tags field").optional().isBoolean(),
  body("genreProgressive", "Error in tags field").optional().isBoolean(),
  body("genrePsychedelia", "Error in tags field").optional().isBoolean(),
  body("genrePunk", "Error in tags field").optional().isBoolean(),
  body("genreTurkishScene", "Error in tags field").optional().isBoolean(),

  asyncHandler(async (req, res, next) => {
    console.log(validationResult(req));
    const errors = validationResult(req);

    // Incase of errors refresh the page
    if (!errors.isEmpty()) {
      console.log("error while validating in the backend");
      res.redirect("http://localhost:5173/article/:id/edit");
      return;
    }

    // Update the article in the database
    try {
      // sanitize the image description to be suitable for the html
      const sanitizedImgAlt = req.body.imgAlt
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");
      // put the checkbox results into an tag object
      const tagObject = {
        genreAlternative: req.body.genreAlternative,
        genreProgressive: req.body.genreProgressive,
        genrePsychedelia: req.body.genrePsychedelia,
        genrePunk: req.body.genrePunk,
        genreTurkishScene: req.body.genreTurkishScene,
      };
      const updateFields = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        articleHeader: req.body.articleHeader,
        mainBody: req.body.mainBody,
        paragraphArray: req.body.paragraphArray,
        imgUrl: req.body.imgUrl,
        imgAlt: sanitizedImgAlt,
        genreTag: tagObject,
      };
      const result = await Article.findOneAndUpdate(
        {
          uuid: req.params.id,
        },
        updateFields,
        { new: true }
      ).exec();
      res.redirect("http://localhost:5173/article/:id/edit");
    } catch (err) {
      console.error("Error saving article:", err);
      res.status(500).send("Server Error");
    }
  }),
];

// get all the saved articles
exports.all_articles_get = asyncHandler(async (req, res, next) => {
  const allArticles = await Article.find().sort({ date_of_article: -1 }).exec();
  res.send(allArticles);
});

// get articles with the tag alternative
exports.alternative_articles_get = asyncHandler(async (req, res, next) => {
  const alternativeArticles = await Article.find({
    "genreTag.genreAlternative": true,
  })
    .sort({ date_of_article: -1 })
    .exec();
  res.send(alternativeArticles);
});

// get articles with the tag psychedelia
exports.psychedelia_articles_get = asyncHandler(async (req, res, next) => {
  const psychedeliaArticles = await Article.find({
    "genreTag.genrePsychedelia": true,
  })
    .sort({ date_of_article: -1 })
    .exec();
  res.send(psychedeliaArticles);
});

// get articles with the tag progressive
exports.progressive_articles_get = asyncHandler(async (req, res, next) => {
  const progressiveArticles = await Article.find({
    "genreTag.genreProgressive": true,
  })
    .sort({ date_of_article: -1 })
    .exec();
  res.send(progressiveArticles);
});

// get articles with the tag punk
exports.punk_articles_get = asyncHandler(async (req, res, next) => {
  const punkArticles = await Article.find({
    "genreTag.genrePunk": true,
  })
    .sort({ date_of_article: -1 })
    .exec();
  res.send(punkArticles);
});

// get articles with the tag turkish scene
exports.turkish_scene_articles_get = asyncHandler(async (req, res, next) => {
  const turkishSceneArticles = await Article.find({
    "genreTag.genreTurkishScene": true,
  })
    .sort({ date_of_article: -1 })
    .exec();
  res.send(turkishSceneArticles);
});

// get a specific article that matches UUID
exports.article_get = asyncHandler(async (req, res, next) => {
  const article = await Article.find({ uuid: req.params.id }).exec();
  res.send(article);
});

// get a specific article that matches UUID
exports.article_delete = asyncHandler(async (req, res, next) => {
  const articleDelete = await Article.findOneAndDelete({
    uuid: req.params.id,
  }).exec();
  res.send(articleDelete);
});

// get all the saved articles except the one with the matched UUID
exports.all_articles_except_matched_get = asyncHandler(
  async (req, res, next) => {
    const allArticlesExceptMatched = await Article.find({
      uuid: { $ne: req.params.id },
    })
      .sort({ date_of_article: -1 })
      .exec();
    res.send(allArticlesExceptMatched);
  }
);

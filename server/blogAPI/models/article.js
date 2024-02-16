const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  uuid: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  articleHeader: { type: String, required: true },
  mainBody: { type: String, required: true },
  imgUrl: { type: String, required: true },
  imgAlt: { type: String, required: true },
  genreTag: { type: Object, required: true },
  paragraphArray: { type: Array, required: true },
  date_of_article: { type: Date, required: true },
});

module.exports = mongoose.model("Article", ArticleSchema);

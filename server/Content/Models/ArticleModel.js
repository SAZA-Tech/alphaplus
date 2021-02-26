const { model, Schema } = require("mongoose");

const ArticleSchema = new Schema({
  articleTitle: String,
  articleBody: String,
  articleAuthorId: String,
  // articleComments: [
  //   {
  //     type: CommentSchema,
  //     default: {},
  //   },
  // ],
  articleTags: Array,
  createdAt: String,
  updatedAt: String,
});

module.exports = model("Article", ArticleSchema);

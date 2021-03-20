const { model, Schema } = require("mongoose");

const ArticleSchema = new Schema({
  articleTitle: String,
  articleBody: String,
  articleAuthorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  articleComments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  articleTags: Array,
  createdAt: String,
  updatedAt: String,
});

module.exports = model("Article", ArticleSchema);

const { model, Schema } = require("mongoose");



const CommentSchema = new Schema({
    articleId: {
      type: Schema.Types.ObjectId,
      ref: "Article",
    },
    commentAuthorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    commentBody: String,
    createdAt: String,
  });
  module.exports = model("Comment", CommentSchema);
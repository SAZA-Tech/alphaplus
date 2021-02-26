const { model, Schema } = require("mongoose");



const CommentSchema = new Schema({
    articleId: String,
    commentAuthorId: String,
    commentBody: String,
    createdAt: String,
  });
  module.exports = model("Comment", CommentSchema);
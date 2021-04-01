const { model, Schema } = require("mongoose");

const CommentSchema = new Schema({
  commentAuthorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  articleId: {
    type: Schema.Types.ObjectId,
    ref: "Article",
  },

  commentBody: String,
  createdAt: String,
});
module.exports = model("Comment", CommentSchema);

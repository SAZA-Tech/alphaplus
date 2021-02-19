const { model, Schema } = require("mongoose");
import User from "../Auth/UserModel";
const ArticleSchema = new Schema({
  articleTitle: String,
  articleBody: Map,
  articleAuthor: User,
  articleComments: [CommentSchema],
  articleTags: [String],
  createdAt: String,
  updatedAt: String,
});

module.exports = model("Article", ArticleSchema);

const DraftSchema = new Schema({
  draftName: String,
  draftBody: Map,
  draftAuthor: User,
  createdAt: String,
  updatedAt: String,
});
module.exports = model("Draft", DraftSchema);

const CommentSchema = new Schema({
  commentAuthor: User,
  commentBody: String,
  createdAt: String,
});
module.exports  = model("Comment", CommentSchema);

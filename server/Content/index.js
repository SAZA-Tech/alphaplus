const DraftControl = require("./DraftControl");
const ArticleControl = require("./ArticlesControl");
const CommentControl = require("./CommentControl");
const FileUploadControl = require("./FileUploadControl");
module.exports = {
  ...DraftControl,
  ...ArticleControl,
  ...CommentControl,
  ...FileUploadControl,
};

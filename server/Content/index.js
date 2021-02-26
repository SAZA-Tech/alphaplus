const DraftControl = require("./DraftControl");
const ArticleControl = require("./ArticlesControl");
const CommentControl = require("./CommentControl");
module.exports = {
  ...DraftControl,
  ...ArticleControl,
  ...CommentControl,
};

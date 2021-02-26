const { isAuthrized } = require("../Auth/Autherization");
const { validateContentInput } = require("../Auth/validators");
const { ArticleControl } = require("./ArticlesControl");
const Article = require("./Models/ArticleModel");
const Comment = require("./Models/CommentModel");
module.exports.CommentControl = {
  addComment: async (
    _,
    { autherId, articleId, contentInput: { title, body } },
    context
  ) => {
    const { valid, errors } = validateContentInput(title, body);

    if (!valid) {
      throw new UserInputError(`Invalid Input ${errors}`);
    }
    if (isAuthrized(_, { id }, context)) {
      const article = await Article.findById(articleId);
      const commentAuther = await findUser(_, { id: autherId });
      const comment = new Comment({
        articleId: article._id,
        commentAutherId: commentAuther._id,
        commentBody: body,
        createdAt: new Date().toISOString(),
      });
      const res = await comment.save();
      return {
        id: res._id,
        ...res._doc,
        commentAuther,
      };
    } else {
      throw new Error("Not Authrized");
    }
  },
  deleteComment: async (_, { commentId }, context) => {
    const comment = await Comment.findById(commentId);

    if (isAuthrized(_, { id: comment.autherId }, context)) {
      return comment
        .delete()
        .then(() => "Comment is deleted sucessfully")
        .catch((err) => console.log(`Failed to delete comment ${err}`));
    } else {
      throw new Error("Not Autrized To delete");
    }
  },
  getComments: async (
    _,
    { filter: { userId, articleId, companyId, tags } },
    context
  ) => {
    const commentDocs = [];
    if (
      (userId == null) &
      (articleId == null) &
      (companyId == null) &
      (tags == null)
    ) {
      commentDocs = await Comment.find();
    } else {
      // Other wise set up the filter
      const Filter = {};
      if (userId != null) Filter.commentAuthorId = userId;
      if (articleId != null) Filter.articleId = articleId;

      // TODO: Get Company Tag from company Id
      //   if(companyId!=null) Filter.
      // Find the articles
      commentDocs = await Comment.find(Filter);
    }
    // get auther data
    const comments = [];
    commentDocs.map(async (v) => {
      const commentAuthor = await findUser(_, { id: v.commentAuthorId });
      comments.push({
        commentAuthor,
        id: v._id,
        ...v._doc,
      });
      return comments;
    });
  },
};

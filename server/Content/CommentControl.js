const { isAuthrized } = require("../Auth/Autherization");
const { validateContentInput } = require("../Auth/validators");
const { ArticleControl } = require("./ArticlesControl");
const { findUser } = require("../Auth/AuthControl");

const Article = require("./Models/ArticleModel");
const Comment = require("./Models/CommentModel");
module.exports.CommentControl = {
  addComment: async (_, { autherId, articleId, commentBody }, context) => {
    // const { valid, errors } = validateContentInput(title, body);

    if (commentBody.trim() === "") {
      throw new UserInputError("Empty comment", {
        errors: {
          body: "Comment body must not empty",
        },
      });
    }
    if (isAuthrized(_, { autherId }, context)) {
      const article = await Article.findById(articleId);
      const commentAuthor = await findUser(_, { id: autherId });
      console.log(`comment auther id :${commentAuthor._id}`);
      const comment = new Comment({
        articleId: article._id,
        commentAuthorId: commentAuthor._id,
        commentBody: commentBody,
        createdAt: new Date().toISOString(),
      });
      const res = await comment.save();
      article.articleComments.push(res._id);
      await article.save();
      return {
        id: res._id,
        ...res._doc,
        commentAuthor,
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
    let commentDocs = [];
    if (
      (userId == null) &
      (articleId == null) &
      (companyId == null) &
      (tags == null)
    ) {
      commentDocs = await Comment.find()
        .populate("commentAuthorId")
        .populate("articleId")
        .exec();
    } else {
      // Other wise set up the filter
      const Filter = {};
      if (userId != null) Filter.commentAuthorId = userId;
      if (articleId != null) Filter.articleId = articleId;

      // TODO: Get Company Tag from company Id
      //   if(companyId!=null) Filter.
      // Find the articles
      commentDocs = await Comment.find(Filter)
        .populate("commentAuthorId")
        .exec();
    }
    // get auther data
    let comments = [];
    commentDocs.map((e) => {
      comments.push({
        commentAuthor: {
          id: e.commentAuthorId.id,
          ...e.commentAuthorId._doc,
        },
        id: e._id,
        ...e._doc,
      });
    });
    return comments;
  },
};

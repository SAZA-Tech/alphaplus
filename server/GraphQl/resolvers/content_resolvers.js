const Content = require("../../Content");

module.exports = {
  Query: {
    getDrafts: Content.DraftControl.getDrafts,
    getArticls: Content.ArticleControl.getArticls,
    getComments: Content.CommentControl.getComments,
  },
  Mutation: {
    createDraft: Content.DraftControl.createDraft,
    editDraft: Content.DraftControl.editDraft,
    deleteDraft: Content.DraftControl.deleteDraft,
    publishDraft: Content.DraftControl.publishDraft,
    editArticle: Content.ArticleControl.editArticle,
    deleteArticle: Content.ArticleControl.deleteArticle,
    addComment: Content.CommentControl.addComment,
    deleteComment: Content.CommentControl.deleteComment,
  },
};

const Content = require("../../Content");

module.exports = {
  Query: {
    getDrafts: Content.DraftControl.getDrafts,
    getDraft: Content.DraftControl.getDraft,
    getArticles: Content.ArticleControl.getArticles,
    getArticle: Content.ArticleControl.getArticle,
    getComments: Content.CommentControl.getComments,
    uploads: Content.FileUploadControl.uploads,
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
    likeArticle: Content.ArticleControl.likeArticle,
    // singleUpload: Content.FileUploadControl.singleUpload,
    signS3: Content.FileUploadControl.signS3,
  },
};

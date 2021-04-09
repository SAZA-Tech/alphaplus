const Article = require("./Models/ArticleModel");

const getArticleWithTags = async (tags) => {
  const Filter = {};
  if (tags != null) {
    Filter.articleTags = { $all: tags };
    const articleDocs = await Article.find(Filter)
      .populate("articleAuthorId")
      .populate("articleComments")
      .exec();
    const articles = [];
    articleDocs.map((e) => {
      articles.push({
        id: e._id,
        articleAuthor: {
          id: e.articleAuthorId._id,
          name: e.articleAuthorId.name,
          username: e.articleAuthorId.username,
          email: e.articleAuthorId.email,
          createdAt: e.articleAuthorId.createdAt,
        },
        ...e._doc,
      });
    });

    return articles;
  } else {
    throw new Error(`Wrong Tags`);
  }
};
module.exports = getArticleWithTags;

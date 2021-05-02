const { UserInputError } = require("apollo-server");
const { isAuthrized } = require("../Auth/Autherization");
const { validateContentInput } = require("../Auth/validators");
const Article = require("./Models/ArticleModel");
const { findUser } = require("../Auth/AuthControl");
const checkAuth = require("../Auth/check-auth");
const { CommentControl } = require("./CommentControl");
const { CompanyControl } = require("../Company");

const deleteUser = {
  id: "defalut",
  name: "Deleted User",
  username: "jhonDoe",
  email: "jhon@doe.doe",
  createdat: "2000-18",
};
const createArticle = async (_, { draft, tags }, context) => {
  // diffrentiate the title if it - exist
  let articleTitle = "";
  const similarTitles = await Article.find({
    articleTitle: draft.draftName,
  }).countDocuments();
  if (similarTitles.valueOf() > 0) {
    articleTitle = draft.draftName + similarTitles.toString();
  } else {
    articleTitle = draft.draftName;
  }
  const articleBody = draft.draftBody;
  const articleAuthorId = draft.draftAuthorId;
  const articleAuthor = await findUser(_, { id: articleAuthorId });
  //TODO: Check On Tags Values
  await CompanyControl.validateTags(_, tags);
  const articleTags = tags;

  // the schema

  const newArticle = new Article({
    articleTitle,
    articleBody,
    articleAuthorId,
    articleTags,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const res = await newArticle.save();

  // The Returned Object
  return {
    ...res._doc,
    id: res._id,
    articleAuthor,
  };
};

const getArticles = async (
  _,
  { filter: { userId, articleId, companyId, tags, articleTitle } },
  context
) => {
  let articlesDocs = [];

  // Set Up The filter

  // Filter Empty  return all article
  if (
    (userId == null) &
      (articleId == null) &
      (companyId == null) &
      (tags == null) &&
    articleTitle == null
  ) {
    articlesDocs = await Article.find();
  }
  // Other wise set up the filter
  else {
    const Filter = {};
    if (userId != null) Filter.articleAuthorId = userId;
    if (articleId != null) Filter._id = articleId;

    // TODO: Get Company Tag from company Id
    if (companyId != null) {
    }
    if (tags != null) Filter.articleTags = { $all: tags };
    if (articleTitle != null)
      Filter.articleTitle = { $regex: articleTitle, $options: "i" };
    // Find the articles
    articlesDocs = await Article.find(Filter)
      .populate("articleAuthorId")
      .populate("articleComments")
      .exec();
    // get auther data
  }
  const articles = [];
  articlesDocs.map((e) => {
    articles.push({
      id: e._id,
      articleAuthor: e.articleAuthorId
        ? {
            id: e.articleAuthorId._id,
            name: e.articleAuthorId.name,
            username: e.articleAuthorId.username,
            email: e.articleAuthorId.email,
            createdAt: e.articleAuthorId.createdAt,
          }
        : deleteUser,
      ...e._doc,
    });
  });

  return articles;
};

const getArticle = async (_, { articleId }, context) => {
  const article = await Article.findById(articleId)
    .populate("articleAuthorId")
    .populate("articleComments")
    .exec();
  var articleComments = [];
  if (article.$isValid) {
    articleComments = await CommentControl.getComments(
      _,
      {
        filter: {
          articleId: articleId,
          companyId: null,
          tags: null,
          userId: null,
        },
      },
      context
    );
  } else {
    throw new Error(`Article is not found`);
  }
  if (article.articleAuthorId==null) {
    var id = "defalut";
    var name = "jhon doe";
    var username = "jhonDoe";
    var email = "jhon@doe.doe";
    var createdat = "2000-18";
    var likes = {
      createdAt: "dum",
      username: "dum",
      id: "dum",
    };

    var arr = [];
    arr.push(likes);
    article.likes = arr;
    article.save();
    return {
      articleComments: articleComments.values(),
      id: article._id,

      articleAuthor: {
        id: id,
        name: name,
        username: username,
        email: email,
        createdAt: createdat,
      },

      ...article._doc,
    };
  }
  return {
    articleComments: articleComments.values(),
    id: article._id,

    articleAuthor: {
      id: article.articleAuthorId._id,
      name: article.articleAuthorId.name,
      username: article.articleAuthorId.username,
      email: article.articleAuthorId.email,
      createdAt: article.articleAuthorId.createdAt,
    },
    ...article._doc,
  };
};

const editArticle = async (
  _,
  { id, articleId, contentInput: { title, body } },
  context
) => {
  //Content Validation
  const { valid, errors } = validateContentInput(title, body);

  if (!valid) {
    throw new UserInputError(`Erorr ${errors}`);
  }
  //Auth
  if (isAuthrized(_, { id })) {
    const article = await Article.findById(articleId)
      .populate("articleAuthorId")
      .populate("articleComments")
      .exec();
    if (article.$isValid) {
      // const articleAuthor = await findUser(_, { id });
      article.articleTitle = title;
      article.articleBody = body;
      article.updatedAt = new Date().toISOString();
      const res = await article.save();
      return {
        id: res._id,
        articleAuthor: {
          id: res.articleAuthorId._id,
          name: res.articleAuthorId.name,
          username: res.articleAuthorId.username,
          email: res.articleAuthorId.email,
          createdAt: res.articleAuthorId.createdAt,
        },
        ...res._doc,
      };
    } else {
      throw new Error("Article Not Found");
    }
  } else {
    throw new Error("Not Authrized to Edit The Article");
  }
};

const deleteArticle = async (_, { id, articleId }, context) => {
  if (isAuthrized(_, { id }, context)) {
    try {
      const deleteArticle = await Article.findById(articleId);

      return deleteArticle
        .delete()
        .then(() => "Article is deleted successfully")
        .catch((err) => console.log(`Failed to delete the article ${err}`));
    } catch (error) {
      throw new Error(`Error Happend ${error}`);
    }
  } else {
    throw new Error("No Autrhized");
  }
};

const likeArticle = async (_, { articleId }, context) => {
  const auth = checkAuth(context);
  const article = await Article.findById(articleId);
  const user = await findUser(_, { id: auth.id });
  if (article) {
    if (article.likes.find((like) => like.username == user.username)) {
      //Article is already liked
      article.likes = article.likes.filter(
        (like) => like.username !== user.username
      );
    } else {
      //Not liked
      console.log(user.username);
      article.likes.push({
        username: user.username,
        createdAt: new Date().toISOString(),
      });
    }
    const res = await article.save();
    return {
      id: res._id,
      ...res._doc,
    };
  } else {
    throw new UserInputError("Article Not Found");
  }
};

module.exports.ArticleControl = {
  createArticle,
  getArticle,
  getArticles,
  editArticle,
  deleteArticle,
  likeArticle,
};

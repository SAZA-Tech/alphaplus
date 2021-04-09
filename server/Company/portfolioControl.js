const { UserInputError } = require("apollo-server-errors");
const { findUser } = require("../Auth/AuthControl");
const checkAuth = require("../Auth/check-auth");
const { validateSymbols } = require("../Auth/validators");
// const {
//   ArticleControl,
// } = require("C:/My Projects/alphaplus/server/Content/ArticlesControl.js");
// const { getArticleWithTags } = require("../Content/");
// const { ArticleControl } = require("../Content/ArticlesControl.js");
const { CompanyControl } = require("./companyControl");
const Portfolio = require("./Models/PortfolioModel");
const getArticleWithTags = require("../Content/getArticlesTags");
const createPortfolio = async (_, { name, tags }, context) => {
  const auth = checkAuth(context);
  const { errors, valid } = validateSymbols({ tags });
  if (!valid) {
    throw new UserInputError(`Error in tags ${errors}`);
  }

  const user = await findUser(_, { id: auth.id });
  //   console.log(user);
  const companies = CompanyControl.validateTags(_, tags);
  const relatedArticles = await getArticleWithTags(tags);
  //   ArticleControl.accessFun();
  //   const relatedArticles = ArticleControl.getArticles(_, {
  //     filter: {
  //       tags,
  //       articleId: null,
  //       companyId: null,
  //       userId: null,
  //     },
  //   });
  if (companies) {
    const newPorto = new Portfolio({
      name: name,
      follwedTags: tags,
    });
    const res = await newPorto.save();
    user.portfolios.push(res.id);
    await user.save();

    return {
      id: res._id,
      followedCompanies: companies,
      relatedArticles: relatedArticles,
      ...res._doc,
    };
  }
};
const getPortfolio = async (_, { portoId }) => {
  const porto = await Portfolio.findById(portoId);
  const tags = porto.follwedTags;
  if (porto.$isValid) {
    const followedCompanies =  CompanyControl.validateTags(_, tags);
    const relatedArticles = await getArticleWithTags(tags);
    return {
      id: porto.id,
      followedCompanies,
      relatedArticles,
      ...porto._doc,
    };
  }
};
module.exports.PortfolioControl = {
  createPortfolio,
  getPortfolio,
};

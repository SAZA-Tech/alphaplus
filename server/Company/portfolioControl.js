const { UserInputError } = require("apollo-server-errors");
const { findUser } = require("../Auth/AuthControl");
const yes = require("../Auth/UserModel");
const checkAuth = require("../Auth/check-auth");
const { validateSymbols } = require("../Auth/validators");
const { CompanyControl } = require("./companyControl");
const Portfolio = require("./Models/PortfolioModel");
const getArticleWithTags = require("../Content/getArticlesTags");

/**
 * Create a new portfolio@
 * @async
 * @param {*} _
 * @param {object} portfolio the portfolio object
 * @param {string} portfolio.name name of the portfolio
 * @param {string} portfolio[].tags company tags will be follwed in the tags
 * @param {*} context checkAuth
 * @returns {object} portfolio
 */
const createPortfolio = async (_, { name, tags },context) => {
  const auth = checkAuth(context);
  const { errors, valid } = validateSymbols({ tags });
  if (!valid) {
    throw new UserInputError(`Error in tags ${errors}`);
  }

  // const user = await findUser(_, { id:"60747c3595129a3bdc7678db"});
  const user= await yes.findById(auth.id).exec();
  console.log(user);

  if (valid) {
    const newPorto = new Portfolio({
      name: name,
      follwedTags: tags,
    });
    const res = await newPorto.save();
    user.portfolios.push(res.id);
    await user.save();

    return getPortfolio(_, { portoId: res.id });
  } else {
    throw new Error("Invalid Tags");
  }
};
const getPortfolio = async (_, { portoId }) => {
  const porto = await Portfolio.findById(portoId);
  const tags = porto.follwedTags;
  if (porto.$isValid) {
    const followedCompanies = CompanyControl.validateTags(_, tags);
    const relatedArticles = await getArticleWithTags(tags);
    return {
      id: porto.id,
      followedCompanies,
      relatedArticles,
      ...porto._doc,
    };
  }
};

const editPortfolio = async (_, { portoId, name, tags }, context) => {
  const auth = checkAuth(context);
  const porto = await Portfolio.findById(portoId);
  if (porto.$isValid) {
    if (name != "") porto.name = name;
    if (validateSymbols(tags).valid) porto.follwedTags = tags;
    const res = await porto.save();
    return getPortfolio(_, { portoId: res.id });
  } else {
    throw new Error(`Invalid Id`);
  }
};
const deletePortfolio = async (_, { portoId }, context) => {
  if (isAuthrized(_, { portoId }, context)) {
    try {
      const deletePorto = await Portfolio.findById(portoId);

      return deletePorto
        .delete()
        .then(() => "Portfolio is deleted successfully")
        .catch((err) => console.log(`Failed to delete the portfolio ${err}`));
    } catch (error) {
      throw new Error(`Error Happend ${error}`);
    }
  } else {
    throw new Error("No Autrhized");
  }
};
module.exports.PortfolioControl = {
  createPortfolio,
  getPortfolio,
  editPortfolio,
  deletePortfolio,
};

const contentResolvers = require("./content_resolvers");
const companyResovlers = require("./company_resolvers");
const userResovlers = require("./user_resovlers");
const uploadResolvers = require("./uploadResolvers");
module.exports = {
  Article: {
    commentCount: (parent) => parent.articleComments.length,
    likeCount: (parent) => parent.likes.length,
  },
  Query: {
    ...userResovlers.Query,
    ...contentResolvers.Query,
    ...uploadResolvers.Query,
  },
  Mutation: {
    // ...companyResovlers.Mutation,
    ...userResovlers.Mutation,
    ...contentResolvers.Mutation,
    ...uploadResolvers.Mutation,
  },
};

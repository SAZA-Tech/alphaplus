const contentResolvers = require('./content_resolvers');
const companyResovlers = require('./company_resolvers');
const userResovlers = require('./user_resovlers');


module.exports ={
    Query:{
        ...userResovlers.Query,
        ...contentResolvers.Query,
    },
    Mutation:{
        // ...companyResovlers.Mutation,
        ...userResovlers.Mutation,
        ...contentResolvers.Mutation
    }
}
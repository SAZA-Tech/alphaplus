const { gql } = require("apollo-server-express");

module.exports = gql`
    type Query{
        # Get Analyst Drafts 
    getDrafts(id:ID!)[Draft!]!
    # Get Articles , Input with filter 
    getArticls(filter: Filter)[Article!]!
    # Get Comments
    getComments(filter: Filter)[Comment!]!
    }
    type Mutation{
    createDraft(contentInput:ContentInput):Draft!
    editDraft(id:ID!,contentInput:ContentInput):Draft!
    deleteDraft(id:ID!):String!
    publishDraft(id:ID!):Article!
    editArticle(id:ID!,contentInput:ContentInput):Article!
    deleteArticle(id:ID!):String!
    addComment(contentInput:ContentInput):Comment!
    deleteComment(id:ID!):String!
    }
    type Draft {
        id:ID!
        draftName:String!
        draftBody:[String!]!
        draftAuther:User
        createdAt:String
        updatedAt:String
    }
    type Article{
        id:ID!
        articleTitle:String!
        articleBody:[Sting!]!
        articleAuthor:User!
        articleComments:[Comment!]
        articleTags:[String!]!
        createdAt:String
        updatedAt:String

    }
    type Comment{
        id:ID!
        commentAuthor:User!
        commentBody:String!
        createdAt:String

    }
    #Use filter values in the queries
    input Filter {
        userId:ID!
        articleId:ID!
        companyID:ID!
        tags:[String!]
    }
    input ContentInput{
        title:String!
        body:String!
        #for article and drafts
        structerdBody:[String!]!
    }


`;

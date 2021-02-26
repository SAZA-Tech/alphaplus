const { gql } = require("apollo-server-express");

const contentShcema = gql`
  extend type Query {
    # Get Analyst Drafts
    getDrafts(id: ID!): [Draft!]!
    # Get Articles , Input with filter
    getArticls(filter: Filter): [Article!]!
    # Get Comments
    getComments(filter: Filter): [Comment!]!
  }
  extend type Mutation {
    createDraft(id: ID!, contentInput: ContentInput): Draft!
    editDraft(id: ID!, draftID: ID!, contentInput: ContentInput): Draft!
    deleteDraft(id: ID!, draftID: ID!): String!
    publishDraft(draftID: ID!, tags: [String!]!): Article!
    editArticle(id: ID!, articleId: ID!, contentInput: ContentInput): Article!
    deleteArticle(id: ID!, articleId: ID!): String!
    addComment(
      autherId: ID!
      articleId: ID!
      contentInput: ContentInput
    ): Comment!
    deleteComment(commentId: ID!): String!
  }
  type Draft {
    id: ID!
    draftName: String!
    draftBody: String!
    draftAuther: User
    createdAt: String
    updatedAt: String
  }
  type Article {
    id: ID!
    articleTitle: String!
    articleBody:String!
    articleAuthor: User!
    articleComments: [Comment!]
    articleTags: [String!]!
    createdAt: String
    updatedAt: String
  }
  type Comment {
    id: ID!
    articleId:ID!
    commentAuthor: User!
    commentBody: String!
    createdAt: String
  }
  #Use filter values in the queries
  input Filter {
    userId: ID
    articleId: ID
    companyId: ID
    tags: [String!]
  }
  input ContentInput {
    title: String!
    body: String!
    #for article and drafts
    # structerdBody: [String!]!
  }
`;
module.exports = contentShcema;

const { gql } = require("apollo-server-express");

const contentShcema = gql`
  extend type Query {
    # Get Analyst Drafts
    getDrafts(autherId: ID!): [Draft!]!
    getDraft(draftId: ID!): Draft!
    # Get Articles , Input with filter
    getArticles(filter: Filter): [Article!]!
    getArticle(articleId: ID!): Article!
    # Get Comments
    getComments(filter: Filter): [Comment!]!

     # Get uploads
     uploads: [UploadedFileResponse]
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
      commentBody:String!
    ): Comment!
    deleteComment(commentId: ID!): String!
    likeArticle(articleId: ID!): Article!

    # Upload File
    singleUpload(file: Upload!): UploadedFileResponse!
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
    articleBody: String!
    articleAuthor: User!
    articleComments: [Comment!]
    commentCount: Int!
    articleTags: [String!]!
    likes: [Like!]
    likeCount: Int!
    createdAt: String
    updatedAt: String
  }
  type Comment {
    id: ID!
    articleId: ID!
    commentAuthor: User!
    commentBody: String!
    createdAt: String
  }
  type Like {
    id: ID!
    createdAt: String!
    user: User!
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
  }
  type UploadedFileResponse {
    filename: String!
    mimetype: String!
    encoding: String!
    url: String!
  }
`;
module.exports = contentShcema;

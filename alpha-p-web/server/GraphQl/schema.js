const { gql } = require("apollo-server-express");

module.exports = gql`
  type Query {
    findUser(id: ID!): User!
    getUsers: [User!]!
    getCompanies: [Company!]!
    findCompany(symbol: String!):Company!
  }

  type User {
    id: ID!
    type: String!
    username: String!
    name: String
    password: String
    email: String!
    createdAt: String
    token: String!
  }

  type Post {
    id: ID!
    post: String!
  }
  #list of posts ?
  type Company {
    id: ID!
    symbol: String!
    exchange: String!
    open: Float!
    high: Float!
    low: Float!
    close: Float!
    volume: Float!
    posts: [Post]
  }
  # TODO: add defualt value for type
  input RegisterInput {
    name: String
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    updateUserInfo(
      id:ID!
      name:String!
      type: String!
    ): User!
    deleteUser(id: ID!): String!
    #addCompany 
    #deleteCompany
    # createPost(body: String!): Post!
    # deletePost(postId: ID!): String!
    # createComment(postId: String!, body: String!): Post!
    # deleteComment(postId: ID!, commentId: ID!): Post!
    # likePost(postId: ID!): Post!
  }
  enum UserType {
    Admin
    endUser
    analyst
  }
  scalar DateTime
`;

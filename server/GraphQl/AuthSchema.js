const { gql } = require("apollo-server-express");
// const contentShcema = require('./ContentSchema');
module.exports = gql`
  type Query {
    findUser(id: ID!): User!
    getUsers: [User!]!
  }

  type User {
    id: ID!
    type: UserType!
    username: String!
    name: String
    password: String
    email: String!
    createdAt: String
    token: String!
    following: [User!]
    followers: [User!]
    portfolios: [Portfolio!]
    bio: String
    img: String
  }
  input UserProfileInput {
    bio: String
    img: String
    username: String
    name: String
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
    adminLogin(email: String!, password: String!): User!
    updateUserInfo(id: ID!, name: String!, type: String!): User!
    deleteUser(id: ID!): String!
    followUser(userId: ID!): User!
    updateUserProfile(userId: ID!, userInput: UserProfileInput): User!
  }
  enum UserType {
    Admin
    endUser
    analyst
  }
  scalar DateTime
`;

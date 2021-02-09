const { gql } = require("apollo-server");

module.exports = gql`
  type Query {
    findUser(id: ID!): User!
    getUsers: [User!]!
  }

  type User {
    id: ID!
    type: UserType!
    name: String
    password: String,
    email:String!,
    createdAt: String
    token:String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    # createPost(body: String!): Post!
    # deletePost(postId: ID!): String!
    # createComment(postId: String!, body: String!): Post!
    # deleteComment(postId: ID!, commentId: ID!): Post!
    # likePost(postId: ID!): Post!
  }
  enum UserType {
    endUser
    analyst
  }
  scalar DateTime
`;

const { gql } = require("apollo-server-express");
// const contentShcema = require('./ContentSchema');
module.exports = gql`
input SectorInput{
  SecnameInput:String!

}

input CompanyInput {
  Symbol: String
  Comname: String
  SectorID:String
  Market: String
  CompanyID: String

}


type Sector {
  id: ID!
  Secname:String!
  sectorCompanies:[Company]
}

type Company {
  id: ID!
  sectorId: ID!
  market: String
  comname: String
  symbol: String
  exchange: String
  Open: Float
  high: Float
  low: Float
  close: Float
  volume: Float
  #articles: [Article]
}
  type Query {
    findUser(id: ID!): User!
    getUsers: [User!]!
    getCompanies(CompanyInput: CompanyInput!): [Company!]! 
    getSectors:[Sector!]
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


  # TODO: add defualt value for type
  input RegisterInput {
    name: String
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Mutation {
    createSector(SectorInput: SectorInput!): Sector!
    deleteSector(sectorID: ID!): String!
    createCompany(CompanyInput: CompanyInput!): Company   #require api
    deleteCompany(companyId: ID!): String!
    editSector(sectorID: ID!,SectorInput: SectorInput!): Sector!
    editCompany(companyId: ID!,CompanyInput: CompanyInput!):Company!
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

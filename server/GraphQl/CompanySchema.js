const { gql } = require("apollo-server-express");

const companySchema = gql`
  input SectorInput {
    SecnameInput: String!
  }
  input CompanyInput {
    Symbol: String
    Comname: String
    SectorID: String
    Market: String
    CompanyID: String
  }
  type Sector {
    id: ID!
    Secname: String!
    sectorCompanies: [Company]
  }
  type finance {
    exchange: String
    Open: Float
    high: Float
    low: Float
    close: Float
    volume: Float
    date: String
  }
  type Company {
    id: ID!
    sectorId: ID!
    market: String
    comname: String
    symbol: String
    todayFinance: finance
    # exchange: String
    # Open: Float
    # high: Float
    # low: Float
    # close: Float
    # volume: Float
    # date: String
    financialData: [finance]
    articles: [Article]!
  }
  extend type Query {
    validateTags(tags: [String]): [Company]
    getCompanies(CompanyInput: CompanyInput!): [Company]!
    getSectors: [Sector!]
    getPortfolio(portoId: ID!): Portfolio
  }
  extend type Mutation {
    createSector(SectorInput: SectorInput!): Sector!
    deleteSector(sectorID: ID!): String!
    createCompany(CompanyInput: CompanyInput!): Company #require api
    deleteCompany(companyId: ID!): String!
    editSector(sectorID: ID!, SectorInput: SectorInput!): Sector!
    editCompany(CompanyInput: CompanyInput!): Company!
    createPortfolio(name: String, tags: [String!]): Portfolio!
    editPortfolio(portoId: ID!, name: String!, tags: [String!]): Portfolio!
    deletePortfolio(portoId: ID!): String!
  }
  type Portfolio {
    id: ID!
    name: String!
    followedCompanies: [Company!]
    relatedArticles: [Article!]
    follwedTags: [String!]
  }
`;
module.exports = companySchema;

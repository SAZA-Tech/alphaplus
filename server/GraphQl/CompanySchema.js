const { gql } = require("apollo-server-express");

const companySchema = gql`
  input SectorInput {
    SecnameInput: String!
    SectorID: String

  }
  input CompanyFilter {
    Symbol: String
    Comname: String
    SectorID: String
    Market: String
    CompanyID: String
  }
  input CompanyInput {
    Symbol: String
    Comname: String
    SectorID: String
    Market: String
    CompanyID: String
    intro: String
    address: String
    website: String
    phoneNum: String
    Industry: String
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
  type info {
    intro: String
    address: String
    website: String
    phoneNum: String
    Industry: String
  }

  type Company {
    id: ID!
    sectorId: ID!
    market: String
    comname: String
    symbol: String
    todayFinance: finance
    change: String
    info: info
    # exchange: String
    # Open: Float
    # high: Float
    # low: Float
    # close: Float
    # volume: Float
    # date: String
    financialData: [finance]
    articles: [Article]!
    similarCompanies: [Company]!
  }
  extend type Query {
    validateTags(tags: [String]): [Company]
    getCompanies(companyFilter: CompanyFilter!): [Company]!
    getCompany(companyId: ID!): Company!
    getSectors: [Sector!]
    getPortfolio(portoId: ID!): Portfolio
  }
  extend type Mutation {
    createSector(SectorInput: SectorInput!): Sector!
    deleteSector(sectorID: ID!): String!
    createCompany(CompanyInput: CompanyInput!): Company #require api
    deleteCompany(id: ID!,companyId: ID!): String!
    editSector(SectorInput: SectorInput!): Sector!
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

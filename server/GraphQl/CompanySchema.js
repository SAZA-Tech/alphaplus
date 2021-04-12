const { gql } = require("apollo-server-express");

const companySchema = gql`
  input SectorInput {
    SecnameInput: String!
    SectorID: String

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
  }
  extend type Mutation {
    createSector(SectorInput: SectorInput!): Sector!
    deleteSector(sectorID: ID!): String!
    createCompany(CompanyInput: CompanyInput!): Company #require api
    deleteCompany(id: ID!,companyId: ID!): String!
    editSector(SectorInput: SectorInput!): Sector!
    editCompany(CompanyInput: CompanyInput!): Company!
  }
`;
module.exports = companySchema;
const { gql } = require("apollo-server-express");



const CompanyShcema = gql`
extend type Query {
  getCompanies: [Company!]! 
  findCompany(filter: Filter):Company!
  getSectors:[Sector!]!
}
extend type Mutation {
  createSector(SectorInput: SectorInput!): Sector!
  deleteSector(sectorID: ID!): String!
  createCompany(CompanyInput: CompanyInput!): Company!   #require api
  deleteCompany(companyId: ID!): String!
}


 input SectorInput{
    Secname:String!

  }

 input CompanyInput {
    name: String
    sectorID:ID
    Market: String
  
  }


 type Sector {
    id: ID!
    Secname:String!
    companies:[Company]
  }

 type Company {
    id: ID!
    sectorID:ID!
    Market: String
    ComName: String
    symbol: String
    exchange: String
    open: Float
    high: Float
    low: Float
    close: Float
    volume: Float
    articles: [Article]
  }
`;
module.exports = CompanyShcema;
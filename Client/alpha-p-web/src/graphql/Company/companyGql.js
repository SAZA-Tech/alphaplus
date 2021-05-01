import gql from "graphql-tag";

export const COMPANY_GQL = gql`
  query CompanyPageQuery($companyId: ID = "") {
    getCompany(companyId: $companyId) {
      articles {
        id
        articleTitle
        articleTags
        articleAuthor {
          name
        }
      }
      change
      comname
      id
      market
      sectorId
      similarCompanies {
        todayFinance {
          close
        }
        id
        symbol
        comname
        change
      }
      symbol
      todayFinance {
        close
        Open
        exchange
        date
        high
        low
        volume
      }
      financialData {
        Open
        close
        date
        exchange
      }
      isFollowed @client
      info {
        intro
        address
        website
        phoneNum
        Industry
      }
    }
  }
`;

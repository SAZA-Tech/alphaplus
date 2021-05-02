import gql from "graphql-tag";


export const PORTFOLIO_GQL = gql`
  query PORTOPAGE($portoId: ID = "") {
    getCompanies(
      companyFilter: {
        Comname: null
        CompanyID: null
        Market: null
        SectorID: null
        Symbol: null
      }
    ) {
      change
      comname
      id
      symbol
      todayFinance {
        close
        date
      }
    }
    getPortfolio(portoId: $portoId) {
      followedCompanies {
        change
        comname
        id
        symbol
        todayFinance {
          close
          date

          Open
          high
          low
          volume
        }
      }
      id
      name
      follwedTags
      relatedArticles {
        articleAuthor {
          name
          img
        }
        commentCount
        articleTitle
        id
      }
    }
  }
`;

export const FOLLOW_COMPANY_GQL = gql`
  mutation MyMutation($portoId: ID = "", $symbol: String = "") {
    followCompany(portoId: $portoId, symbol: $symbol) {
      follwedTags
      id
      name
    }
  }
`;

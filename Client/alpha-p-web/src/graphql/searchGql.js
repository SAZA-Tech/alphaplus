import gql from "graphql-tag";

export const SEARCH_GQL = gql`
  query SeacrhQuery($filter: Filter = {}, $companyFilter: CompanyFilter = {}) {
    getArticles(filter: $filter) {
      id
      articleTitle
      articleTags
    }
    getCompanies(companyFilter: $companyFilter) {
      id
      symbol
      comname
    }
    getUsers {
      username
      name
      id
    }
  }
`;

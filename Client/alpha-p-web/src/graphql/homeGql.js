import gql from "graphql-tag";

export const HOMEPAGE_GQL = gql`
  query HomePageQuery(
    $companyFilter: CompanyFilter = {
      Comname: null
      CompanyID: null
      Market: null
      SectorID: null
      Symbol: null
    }
  ) {
    getCompanies(companyFilter: $companyFilter) {
      change
      comname
      id
      symbol
      todayFinance {
        close
        date
      }
    }
    getArticles(
      filter: { articleId: null, companyId: null, tags: null, userId: null }
    ) {
      articleAuthor {
        id
        name
      }
      articleTags
      articleTitle
      id
      likeCount
    }
  }
`;

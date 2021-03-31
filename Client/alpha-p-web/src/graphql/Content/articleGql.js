import gql from "graphql-tag";

export const GET_ARTICLES = gql`
  query getArticles(
    $companyId: ID = null
    $articleId: ID = null
    $tags: [String!] = null
    $userId: ID = null
  ) {
    getArticles(
      filter: {
        articleId: $articleId
        companyId: $companyId
        tags: $tags
        userId: $userId
      }
    ) {
      id
      articleBody
      articleComments {
        commentBody
        id
      }
      articleTags
      articleTitle
      likeCount
    }
  }
`;

export const GET_ARTICLE = gql`
  query getArticle($articleId: ID = "") {
    getArticle(articleId: $articleId) {
      articleBody
      articleTags
      articleTitle
      id
      likeCount
      updatedAt
      articleComments {
        commentBody
        createdAt
        id
      }
      articleAuthor {
        id
        name
        username
        email
      }
      commentCount
    }
  }
`;

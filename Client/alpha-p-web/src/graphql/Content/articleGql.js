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
  query getArticleAndComments($articleId: ID = "") {
    getArticle(articleId: $articleId) {
      articleAuthor {
        name
        username
        createdAt
        email
        id
      }
      articleBody
      articleTags
      articleTitle
      commentCount
      createdAt
      id
      likeCount
      likes {
        createdAt
        user {
          username
        }
        id
      }
      updatedAt
    }
    getComments(
      filter: {
        userId: null
        articleId: $articleId
        companyId: null
        tags: null
      }
    ) {
      id
      articleId
      commentAuthor {
        username
        type
        createdAt
        name
      }
      commentBody
      createdAt
    }
  }
`;
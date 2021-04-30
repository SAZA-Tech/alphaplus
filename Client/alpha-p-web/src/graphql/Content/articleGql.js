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
  query getArticleAndComments($articleId: ID = "6039147851427f2954d5fc4d") {
    getArticle(articleId: $articleId) {
      articleAuthor {
        name
        username
        createdAt
        email
        id
        isFollowed @client
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
        username
        id
      }
      isLiked @client
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
        id
      }
      commentBody
      createdAt
    }
  }
`;

export const LIKE_ARTCIEL_GQL = gql`
  mutation MyMutation($articleId: ID = "") {
    likeArticle(articleId: $articleId) {
      likes {
        createdAt
        id
        username
      }
    }
  }
`;
export const GET_COMMENTS = gql`
  query getArticleAndComments($articleId: ID = "6039147851427f2954d5fc4d") {
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
        id
      }
      commentBody
      createdAt
    }
  }
`;
export const EDIT_ARTICLE = gql`
  mutation editArticle($articleId: ID!, $id: ID!, $contentInput: ContentInput) {
    editArticle(articleId: $articleId, id: $id, contentInput: $contentInput) {
      updatedAt
      createdAt
      id
      articleTitle
      articleBody
      articleAuthor {
        id
        username
      }
    }
  }
`;
export const GET_ARTICLE2 = gql`
  query getArticle($articleId: ID!) {
    getArticle(articleId: $articleId) {
      createdAt
      articleBody
      articleTitle
      updatedAt
      id
      articleAuthor {
        username
        id
        email
      }
    }
  }
`;

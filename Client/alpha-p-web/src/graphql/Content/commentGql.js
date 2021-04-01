import gql from "graphql-tag";

export const ADD_COMMENT = gql`
  mutation addComment(
    $autherId: ID = ""
    $articleId: ID = ""
    $commentBody: String = ""
  ) {
    addComment(
      commentBody: $commentBody
      articleId: $articleId
      autherId: $autherId
    ) {
      articleId
      commentBody
      createdAt
      id
      commentAuthor {
        name
        username
      }
    }
  }
`;

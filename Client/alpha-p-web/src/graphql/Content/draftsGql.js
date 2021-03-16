import gql from "graphql-tag";

export const CREATE_DRAFT = gql`
  mutation createDraft($id: ID!, $contentInput: ContentInput) {
    createDraft(id: $id, contentInput: $contentInput) {
      id
      draftName
      draftBody
      draftAuther {
        username
      }
      createdAt
    }
  }
`;

export const GET_DRAFTS = gql`
  query getDrafts($autherId: ID!) {
    getDrafts(autherId: $autherId) {
      draftBody
      draftAuther {
        username
        name
        id
        email
      }
      createdAt
      draftName
      id
    }
  }
`;

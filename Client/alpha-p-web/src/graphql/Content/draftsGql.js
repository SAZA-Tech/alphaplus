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
  query getDrafts($id: ID!) {
    getDrafts(id: $id) {
      draftBody
      draftAuther {
        username
        name
        id
        email
        type
      }
      createdAt
      draftName
      id
    }
  }
`;

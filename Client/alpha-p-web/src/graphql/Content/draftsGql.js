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

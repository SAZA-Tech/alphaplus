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
export const GET_DRAFT = gql`
  query getDraft($draftId: ID!) {
    getDraft(draftId: $draftId) {
      createdAt
      draftBody
      draftName
      updatedAt
      id
      draftAuther {
        username
        id
        email
      }
    }
  }
`;

export const EDIT_DRAFT =gql`
mutation editDraft($draftId: ID!,$id: ID!) {
  editDraft(draftID: $draftID, id: $id) {
    createdAt
    updatedAt
    id
    draftName
    draftBody
    draftAuther {
      id
      username
    }
  }
}
`;

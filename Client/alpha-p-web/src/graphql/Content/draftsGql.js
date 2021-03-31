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

export const EDIT_DRAFT = gql`
  mutation editDraft($draftID: ID!, $id: ID!, $contentInput: ContentInput) {
    editDraft(draftID: $draftID, id: $id, contentInput: $contentInput) {
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

export const PUBLISH_DRAFT = gql`
  mutation publishDraft($draftID: ID!, $tags: [String!]!) {
    publishDraft(draftID: $draftID, tags: $tags) {
      articleTags
      articleTitle
      createdAt
      articleBody
      id
    }
  }
`;

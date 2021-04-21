import gql from "graphql-tag";
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      username
      createdAt
      token
      following {
        id
      }
      portfolios {
        follwedTags
        id
        name
      }
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation register($registerInput: RegisterInput) {
    register(registerInput: $registerInput) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export const PROFILE_GQL = gql`
  query ProfilData($id: ID = "") {
    findUser(id: $id) {
      id
      name
      email
      type
      followers {
        id
        name
        isFollowed @client
      }
      following {
        id
        name
        isFollowed @client
      }
      isFollowed @client
    }
    getArticles(
      filter: { userId: $id, articleId: null, companyId: null, tags: null }
    ) {
      id
      articleTitle
    }
    getComments(filter: { userId: $id }) {
      commentBody
      id
      createdAt
    }
  }
`;
export const FOLLOW_USER_GQL = gql`
  mutation MyMutation($userId: ID = "") {
    followUser(userId: $userId) {
      id
      following {
        id
      }
    }
  }
`;

import UserConfig from "./UserConfig";

const initialUserConfig: UserConfig = JSON.parse(
  window.localStorage.getItem("alph.userConfig")!
) || {
  username: "",
  followedUsers: [],
  portfolio: {
    name: "",
    id: "",
    follwedTags: [],
    __typename: "",
  },
};

export default initialUserConfig;

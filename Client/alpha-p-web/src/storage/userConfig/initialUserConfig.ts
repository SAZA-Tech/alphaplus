import UserConfig from "./UserConfig";

const initialUserConfig: UserConfig = JSON.parse(
  window.localStorage.getItem("alph.userConfig")!
) || {
  username: "",
  followedUsers: [],
  follwedCompanies: [],
};

export default initialUserConfig;

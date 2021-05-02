interface UserConfig {
  username: string | null;
  followedUsers: [any];
  portfolio: {
    follwedTags: [string];
    id: string;
    name: string;
    __typename: string;
  };
  userImg: string | null;
}
export default UserConfig;

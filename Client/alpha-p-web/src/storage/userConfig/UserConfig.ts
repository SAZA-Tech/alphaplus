interface UserConfig {
  username: string | null;
  followedUsers: [any];
  portfolio: {
    follwedTags: [string];
    id: string;
    name: string;
    __typename: string;
  };
}
export default UserConfig;

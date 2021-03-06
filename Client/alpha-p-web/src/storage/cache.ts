import { InMemoryCache, Reference, StoreObject } from "@apollo/client";
import { userConfigVar } from "./userConfig";
const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    User: {
      fields: {
        isFollowed: {
          // read the reactive variable of the current logged in user
          read(_, { readField }) {
            const varId = readField("id");
            const result = userConfigVar().followedUsers.find((v) => {
              return v.id === varId;
            });
            return result ? true : false;
          },
        },
      },
    },
    Article: {
      fields: {
        isLiked: {
          read(_, { readField, toReference }) {
            const likes = readField<any>("likes")!;
            console.log(likes);
            if (likes == null) {
              return false;
            }
            const result = likes.find(
              (e: Reference | StoreObject | undefined) => {
                const useranem = readField("username", e)!;
                return useranem === userConfigVar().username;
              }
            );
            return result ? true : false;
          },
        },
      },
    },
    Company: {
      fields: {
        isFollowed: {
          read(_, { readField }) {
            const symbol = readField("symbol");
            const result = userConfigVar().portfolio.follwedTags.find((v) => {
              return v === symbol;
            });
            return result ? true : false;
          },
        },
      },
    },
  },
});

// export const currentFollwedUsers = makeVar([]);
export default cache;

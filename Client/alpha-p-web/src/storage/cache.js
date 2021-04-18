import { InMemoryCache, makeVar } from "@apollo/client";

export const cache = new InMemoryCache({
  typePolicies: {
    User: {
      fields: {
        isFollowed: {
          // read the reactive variable of the current logged in user
          read(_, { variables }) {
            const id = JSON.stringify(variables.id);
            const result = currentFollwedUsers().find(
              (v) => JSON.stringify(v.id) == id
            );
            return result ? true : false;
          },
        },
      },
    },
  },
});

export const currentFollwedUsers = makeVar([]);

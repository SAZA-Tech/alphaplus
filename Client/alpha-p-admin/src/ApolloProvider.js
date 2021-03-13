import React from "react";
import App from "./App";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

//Server URL

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      ...headers,

      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
          <Provider store={store}>
           <App/>
          </Provider>
  </ApolloProvider>
);
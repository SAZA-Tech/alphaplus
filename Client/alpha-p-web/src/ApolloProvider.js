import React from "react";
import App from "./App";
import { ApolloClient, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { cache } from "./storage";
//Server URL
const uri = "https://alpha-plus-server.herokuapp.com/graphql";
const httpLink = createHttpLink({
  uri: uri,
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
  cache: cache,
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

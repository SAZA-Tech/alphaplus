import React from 'react';
import App from './App';
import {ApolloClient,ApolloProvider,InMemoryCache,createHttpLink} from '@apollo/client'


//Server URL

const httpLink = createHttpLink({
    uri:'http://localhost:4000/graphql'

});

const client = new ApolloClient({
    link:httpLink,
    cache: new InMemoryCache()
});

export default(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)
import { split } from 'apollo-link';
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink,createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloClient } from "apollo-client";
import { setContext } from 'apollo-link-context';
const httpLink = new HttpLink({
  uri: 'https://murmuring-fortress-24950.herokuapp.com/'
});
  
// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: 'wss://murmuring-fortress-24950.herokuapp.com/',
  options: {
    reconnect: true
  }
});
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  console.log("sending token")
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
}); 
// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
);
  

const client=new ApolloClient({
    link,
    cache: new InMemoryCache(),
    credentials: 'include',
    request: async operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'same-origin'
        }
      })
    },
    fetchOptions: {
      credentials: 'include'
   }
  })

export default client
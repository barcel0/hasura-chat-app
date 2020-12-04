import { split, HttpLink, ApolloClient, InMemoryCache } from '@apollo/client';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const wsLink = new WebSocketLink({
  uri: '', //add websocket uri here
  options: {
    reconnect: true
  }
});

const httpLink = new HttpLink({
  uri: '' //add https uri here
});

const link = split(
  //split depending on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink
);

export default new ApolloClient({
  cache: new InMemoryCache(),
  link
});
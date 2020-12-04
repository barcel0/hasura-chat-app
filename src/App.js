import { ApolloProvider } from '@apollo/client';
import Chat from './screens/Chat';
import apolloClient from './apollo/apolloClient';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Chat />
    </ApolloProvider>
  );
}

export default App;

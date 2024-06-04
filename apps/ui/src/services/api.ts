import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
import { setContext } from '@apollo/client/link/context';

const restLink = new RestLink({ uri: 'http://localhost:3000/api' });
const httpLink = createHttpLink({
  uri: 'https://api.studio.thegraph.com/query/69025/charity-plateform-subgraph/v0.0.4',
});
// const authLink = setContext((_, { headers }) => {
//   let token = localStorage.getItem('token');
//   token = token?.slice(1, -1);

//   return {
//     headers: {
//       ...headers,
//       Authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });

const client = new ApolloClient({
  cache: new InMemoryCache({ typePolicies: {} }),
  link: ApolloLink.from([httpLink]),
  // link: ApolloLink.from([authLink.concat(restLink), authLink.concat(httpLink)]),
  defaultOptions: {
    watchQuery: {
      nextFetchPolicy: 'no-cache',
    },
  },
});

interface PostRequestProps {
  data: any;
  request: any;
}

export async function post({ request, data }: PostRequestProps) {
  const response = await request({
    variables: {
      input: {
        ...data,
      },
    },
  });
  return response;
}
interface ClientInterface extends ApolloClient<any> {
  post: ({ request, data }: PostRequestProps) => Promise<any>;
}

const Client: ClientInterface = client;

Client.post = post;

export default Client;

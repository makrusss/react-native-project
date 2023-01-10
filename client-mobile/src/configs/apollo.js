import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://13.212.90.209:4000/",
  cache: new InMemoryCache(),
});

export default client;

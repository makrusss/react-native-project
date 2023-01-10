if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const userScheme = require("./scheme/userScheme");
const productScheme = require("./scheme/productScheme");

const server = new ApolloServer({
  typeDefs: [userScheme.typeDefs, productScheme.typeDefs],
  resolvers: [userScheme.resolvers, productScheme.resolvers],
  introspection: true,
});

startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});

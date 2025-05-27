import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { db } from './db.js';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql

type Product {
    id: ID!
    name: String
    image: String
    description: String
    price: Float
    quantity: Int
    onStock: Boolean
    categoryId: String
}
type Query{
    products: [Product]
}

`;

const resolvers = {
  Query: {
    products: () => db.products,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);

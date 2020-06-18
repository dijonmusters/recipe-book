const { ApolloServer, gql } = require('apollo-server-lambda');
const { readFromS3 } = require('./s3');

const typeDefs = gql`
  type Recipe {
    title: String
    time: String
    ingredients: [String]
    method: [String]
  }

  type Query {
    recipes: [Recipe]
  }
`;

const resolvers = {
  Query: {
    recipes: readFromS3,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

exports.handler = server.createHandler({ cors: { origin: '*' } });

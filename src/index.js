const { ApolloServer } = require('apollo-server');



import { typeDefs , resolvers } from "./schema"

// var app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    mocks: true,
    mockEntireSchema: false,
});

server.listen(4000);
require('dotenv').config()
const { ApolloServer } = require('apollo-server');

import firebase from "./firebase"
import { typeDefs, resolvers } from "./schema"
import dataStore from "./data"


firebase.init()

// var app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    // mocks: true,
    // mockEntireSchema: false,
    context: async ({ req }) => {
        // get the user token from the headers
        const token = req.headers.authorization || false;

        if (!token) {
            return false
        }

        // try to retrieve a user with the token
        const user = await dataStore.getUser(token);

        // add the user to the context
        return { user };
    }
});

server.listen(4000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';

import { MANGODB }  from './config.js';
import typeDefs from './graphql/TypeDefs.js';
import resolvers from './graphql/resolvers/index.js';

const server = new ApolloServer({ typeDefs, resolvers });

mongoose.connect(MANGODB, { useNewUrlParser: true })
    .then(() => {
        console.log("connected to db");
        return server.listen({ port: 5003 })
    })
    .then(({ url }) => console.log(`Server ready at ${url}`))
    .catch((error) => console.log("error while connecting",error));

    // https://stackblitz.com/edit/graphql-hlmtyc?file=index.js
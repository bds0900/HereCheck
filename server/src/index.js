// /index.js
// This file contains the definition and creation for the HereCheck backend server
// By Pi Project Team
// April, 2020
import '@babel/polyfill/noConflict'
import { GraphQLServer, PubSub } from 'graphql-yoga'
import { resolvers, fragmentReplacements } from './resolvers/index'
import { prisma, db } from './prisma'
import { compareSync } from 'bcryptjs'


const pubsub = new PubSub()

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context(request) {
        return {
            pubsub,
            prisma,
            request,
            db
        }
    },
    //fragmentReplacements
})

const corsConfig = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}

server.start({ port: process.env.PORT || 4000, cors: corsConfig }, () => {
    console.log('The server is up!')
})
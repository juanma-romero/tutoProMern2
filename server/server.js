const fs = require('fs');
const express = require('express');
const { GraphQLScalarType } = require('graphql');
const { ApolloServer } = require('apollo-server-express');

let aboutMessage = "Changos!";

const issuesDB = [{
    id: 1,
    status: 'New',
    owner: 'Ravan',
    effort: 5,
    created: new Date('2018-08-15'),
    due: undefined,
    title: 'Error in console when clicking Add'
  }, {
    id: 2,
    status: 'Assigned',
    owner: 'Eddie',
    effort: 14,
    created: new Date('2018-08-16'),
    due: new Date('2018-08-30'),
    title: 'Missing bottom border on panel'
  }, {
    id: 3,
    status: 'New',
    owner: 'Juancho',
    effort: 24,
    created: new Date('2020-03-16'),
    due: new Date('2020-03-28'),
    title: 'pantallazo 27/3'
  }];

const GraphQLDate = new GraphQLScalarType({
    name: 'GraphQLDate',
    description: 'A Date() type in GraphQL as a scalar',
    serialize(value) {
        return value.toISOString();
    },
});

const resolvers = {
    Query: {
        about: () => aboutMessage,
        issueList,
    },
    Mutation: {
        setAboutMessage,
    },
    GraphQLDate
};

function setAboutMessage(_, { message }) {
    return aboutMessage = message;
}

function issueList() {
    return issuesDB
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
    resolvers,
});

const app = express();
app.use(express.static('public'));

server.applyMiddleware({ app, path: '/graphql' });
app.listen(3000, function () {
console.log('App started on port 3000');
});


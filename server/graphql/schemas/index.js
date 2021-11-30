const { gql } = require('apollo-server-express');
const user = require('./user');
const animation = require('./animation');

const rootType = gql`
 type Query {
     root: String
 }
 type Mutation {
     root: String
 }

`;

module.exports = [rootType, user, animation];
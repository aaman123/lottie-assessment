const { gql } = require('apollo-server-express');
const GraphQLJSON = require('graphql-type-json');

module.exports = gql`
    scalar JSON

    type Animation {
        email: String!
        animationJson: JSON
        tags: [String!]!
    }

    extend type Query {
        getAllAnimations: [Animation!]
    }

    extend type Mutation {
        saveAnimation(email: String!, animationJson: JSON, tags: [String!]!): saveAnimationResponse
    }

    type saveAnimationResponse {
        email: String!
        animationJson: JSON
    }
`;
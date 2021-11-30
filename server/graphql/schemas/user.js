const { gql } = require('apollo-server-express');

module.exports = gql`
    type User {
        email: String!
        username: String!
        photoUrl: String!
    }

    extend type Mutation {
        register(input: RegisterInput!): RegisterResponse
    }

    input RegisterInput {
        email: String!
    }

    type RegisterResponse {
        email: String!
        username: String!
        photoUrl: String!
    }
`;
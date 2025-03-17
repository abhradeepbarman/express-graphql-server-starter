const authTypeDef = `#graphql
    type Mutation {
        register(name: String!, password: String!, email: String!): AuthPayload
    }

    type AuthPayload {
        access_token: String!
        user: User!
    }

    type User {
        id: ID!
        name: String
        email: String
    }
`;

export default authTypeDef;

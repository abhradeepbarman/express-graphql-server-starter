const authTypeDef = `#graphql
    type Mutation {
        register(name: String!, password: String!, email: String!): User
    }

    type User {
        id: ID!
        name: String
        email: String
        password: String
        createdAt: String
        updatedAt: String
    }
`;

export default authTypeDef;

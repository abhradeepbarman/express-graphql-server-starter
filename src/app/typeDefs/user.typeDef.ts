const userTypeDef = `#graphql
    type Query {
        getCurrentUser: User
        getUserById(id: ID!): User!
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

export default userTypeDef;

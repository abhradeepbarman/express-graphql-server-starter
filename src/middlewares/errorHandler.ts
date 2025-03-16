import type { GraphQLFormattedError } from "graphql"; 
import { GraphQLError } from "graphql";

export const formatError = (
    formattedError: GraphQLFormattedError,
    error: unknown
): GraphQLFormattedError => {
    if (error instanceof GraphQLError) {
        console.error("GraphQL Error:", error.message); 
        return {
            message: error.message || "An unexpected error occurred",
            extensions: {
                code: error.extensions?.code || "INTERNAL_SERVER_ERROR",
                http: error.extensions?.http || { status: 500 },
            },
        };
    } else {
        return formattedError;
    }
};
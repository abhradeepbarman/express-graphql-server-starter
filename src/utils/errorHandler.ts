import { GraphQLError } from "graphql";

class GraphQLErrors {
    /**
     * Returns a GraphQLError for authentication failures.
     * @param message - Custom error message (default: "Authentication required").
     * @returns GraphQLError with UNAUTHENTICATED code and 401 status.
     */
    static AuthenticationError(message = "Authentication required") {
        return new GraphQLError(message, {
            extensions: { code: "UNAUTHENTICATED", http: { status: 401 } },
        });
    }

    /**
     * Returns a GraphQLError for access denial.
     * @param message - Custom error message (default: "Access denied").
     * @returns GraphQLError with FORBIDDEN code and 403 status.
     */
    static ForbiddenError(message = "Access denied") {
        return new GraphQLError(message, {
            extensions: { code: "FORBIDDEN", http: { status: 403 } },
        });
    }

    /**
     * Returns a GraphQLError for invalid user input.
     * @param message - Custom error message (default: "Invalid input").
     * @returns GraphQLError with BAD_USER_INPUT code and 400 status.
     */
    static BadUserInputError(message = "Invalid input") {
        return new GraphQLError(message, {
            extensions: { code: "BAD_USER_INPUT", http: { status: 400 } },
        });
    }

    /**
     * Returns a GraphQLError for internal server errors.
     * @param message - Custom error message (default: "Internal Server Error").
     * @returns GraphQLError with INTERNAL_SERVER_ERROR code and 500 status.
     */
    static InternalServerError(message = "Internal Server Error") {
        return new GraphQLError(message, {
            extensions: {
                code: "INTERNAL_SERVER_ERROR",
                http: { status: 500 },
            },
        });
    }

    /**
     * Returns a custom GraphQLError.
     * @param message - Custom error message (default: "An error occurred").
     * @param code - Custom error code (default: "INTERNAL_SERVER_ERROR").
     * @param status - HTTP status code (default: 500).
     * @param details - Additional error details (optional).
     * @returns GraphQLError with custom properties.
     */
    static CustomGraphQLError(
        message = "An error occurred",
        code = "INTERNAL_SERVER_ERROR",
        status = 500,
        details?: string
    ) {
        return new GraphQLError(message, {
            extensions: {
                code,
                http: { status },
                details,
            },
        });
    }
}

export default GraphQLErrors;

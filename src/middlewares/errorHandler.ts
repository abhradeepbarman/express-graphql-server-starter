import type { GraphQLFormattedError } from "graphql";
import { GraphQLError } from "graphql";
import { ZodError } from "zod";

export const formatError = (
    formattedError: GraphQLFormattedError,
    error: unknown
): GraphQLFormattedError => {

    if (error instanceof GraphQLError && error.originalError) {
        if (error.originalError instanceof ZodError) {
            return {
                message: "Validation Error",
                extensions: {
                    code: "VALIDATION_ERROR",
                    http: { status: 400 }, // Bad Request
                    details: error.originalError.errors.map((err) => ({
                        path: err.path.join("."),
                        message: err.message,
                    })),
                },
            };
        }

        return {
            message: error.message || "An unexpected error occurred",
            extensions: {
                code: error.extensions?.code || "INTERNAL_SERVER_ERROR",
                http: error.extensions?.http || { status: 500 },
                details: error.extensions?.details || null,
            },
        };
    }

    if (error instanceof Error) {
        return {
            message: error.message || "An unexpected error occurred",
            extensions: {
                code: "INTERNAL_SERVER_ERROR",
                http: { status: 500 },
            },
        };
    }

    return {
        message: "An unexpected error occurred",
        extensions: {
            code: "INTERNAL_SERVER_ERROR",
            http: { status: 500 },
        },
    };
};

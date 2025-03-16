import { GraphQLError } from "graphql";

export class AuthenticationError extends GraphQLError {
    constructor(message = "Authentication required") {
        super(message, {
            extensions: { code: "UNAUTHENTICATED", http: { status: 401 } },
        });
    }
}

export class ForbiddenError extends GraphQLError {
    constructor(message = "Access denied") {
        super(message, {
            extensions: { code: "FORBIDDEN", http: { status: 403 } },
        });
    }
}

export class ValidationError extends GraphQLError {
    constructor(message = "Invalid input") {
        super(message, {
            extensions: { code: "BAD_USER_INPUT", http: { status: 400 } },
        });
    }
}

export class InternalServerError extends GraphQLError {
    constructor(message = "Internal Server Error") {
        super(message, {
            extensions: {
                code: "INTERNAL_SERVER_ERROR",
                http: { status: 500 },
            },
        });
    }
}

export class CustomGraphQLError extends GraphQLError {
    constructor(
        message: string = "An error occurred",
        code: string = "INTERNAL_SERVER_ERROR",
        status: number = 500,
        details?: Record<string, any> 
    ) {
        super(message, {
            extensions: {
                code,
                http: { status },
                details,
            },
        });
    }
}
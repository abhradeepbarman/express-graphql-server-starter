import { ApolloServer } from "@apollo/server";
import cors, { type CorsRequest } from "cors";
import express, { type Application } from "express";
import type { GraphQLContext } from "../@types/context.types";
import mergedTypeDefs from "./typeDefs";
import mergedResolvers from "./resolvers";
import { expressMiddleware } from "@apollo/server/express4";
import { formatError } from "../middlewares/errorHandler";

export const initServer = async (): Promise<Application> => {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get("/", (req, res): void => {
        res.send("Hello World");
    });

    const graphqlServer = new ApolloServer<GraphQLContext>({
        typeDefs: mergedTypeDefs,
        resolvers: mergedResolvers,
        formatError: formatError
    });

    await graphqlServer.start();

    app.use(
        "/graphql",
        cors<CorsRequest>(),
        express.json(),
        expressMiddleware(graphqlServer, {
            context: async ({ req }) => ({ user: undefined }),
        })
    );

    return app;
};

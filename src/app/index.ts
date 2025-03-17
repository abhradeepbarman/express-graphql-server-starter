import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors, { type CorsRequest } from "cors";
import express, { type Application } from "express";
import jwt from "jsonwebtoken";
import type { GraphQLContext } from "../@types/context.types";
import { formatError } from "../middlewares/errorHandler";
import mergedResolvers from "./resolvers";
import mergedTypeDefs from "./typeDefs";
import { config } from "../config/config";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { users } from "../db/schema";
import GraphQLErrors from "../utils/errorHandler";
import { getUserFromToken } from "./controllers/auth.controller";

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
        formatError,
    });

    await graphqlServer.start();

    app.use(
        "/graphql",
        cors<CorsRequest>(),
        express.json(),
        expressMiddleware(graphqlServer, {
            context: async ({ req }) => {
                const token = req.headers.authorization?.split(" ")[1];
                const user = await getUserFromToken(token);
                return { user };
            },
        })
    );

    return app;
};

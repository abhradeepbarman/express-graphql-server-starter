import { eq } from "drizzle-orm";
import type { GraphQLContext } from "../../@types/context.types";
import { db } from "../../db";
import { users } from "../../db/schema";

const userResolver = {
    Query: {
        getCurrentUser: async (
            parent: any,
            args: any,
            context: GraphQLContext
        ) => {
            if (!context.user?.id) return null;
            const userDetails = await db.query.users.findFirst({
                where: eq(users.id, context.user.id),
            });
            return userDetails;
        },
        getUserById: async (
            parent: any,
            { id }: { id: string },
            context: GraphQLContext
        ) => {
            const userDetails = await db.query.users.findFirst({
                where: eq(users.id, id),
            });
            return userDetails
        },
    },
};

export default userResolver;

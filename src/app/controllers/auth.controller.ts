import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { config } from "../../config/config";
import { users } from "../../db/schema";
import { db } from "../../db";

export const getUserFromToken = async (token: string | undefined) => {
    if (!token) return null;

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET) as {
            id: string;
        };

        const userDetails = await db.query.users.findFirst({
            where: eq(users.id, decoded.id),
        });

        if (!userDetails) {
            return null;
        }

        const user = {
            id: userDetails?.id,
            email: userDetails?.email,
            name: userDetails?.name,
        };
        return user;
    } catch (error) {
        console.error("Invalid token: ", error);
    }
};

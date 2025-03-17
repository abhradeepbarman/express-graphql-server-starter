import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { config } from "../../config/config";
import { db } from "../../db";
import { users } from "../../db/schema";
import GraphQLErrors from "../../utils/errorHandler";
import { registerSchema } from "../../validators/auth/register.schema";
import { asyncHandler } from "../../middlewares/asyncHandler";

const authResolver = {
    Mutation: {
        register: asyncHandler(
            async (parent: any, args: any, context: any, info: any) => {
                const { name, email, password } = registerSchema.parse(args);

                // find existing user
                const existingUser = await db.query.users.findFirst({
                    where: eq(users.email, email),
                });

                if (existingUser) {
                    throw GraphQLErrors.ForbiddenError("User already exists");
                }

                // hash password
                const hashedPassword = await bcrypt.hash(password, 10);

                // create user
                const newUser = await db
                    .insert(users)
                    .values({
                        name,
                        email,
                        password: hashedPassword,
                    })
                    .returning();

                // generate token
                const payload: JwtPayload = {
                    id: newUser[0].id,
                    email: newUser[0].email,
                    name: newUser[0].name,
                };

                const access_token = jwt.sign(payload, config.JWT_SECRET, {
                    expiresIn: "1h",
                });

                const refresh_token = jwt.sign(payload, config.JWT_SECRET, {
                    expiresIn: "7d",
                });

                // save token
                const updatedUser = await db
                    .update(users)
                    .set({
                        refresh_token,
                    })
                    .where(eq(users.id, newUser[0].id))
                    .returning();

                //TODO: send email

                // return response
                return {
                    access_token,
                    user: updatedUser[0],
                };
            }
        ),
    },
};

export default authResolver;

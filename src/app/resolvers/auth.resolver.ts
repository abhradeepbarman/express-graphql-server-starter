const authResolver = {
    Mutation: {
        register: async (parent: any, args: any, context: any, info: any) => {
            const { name, email, password } = args;

            //     const isExist = await db.query.users.findFirst({
            //         where: eq(users.email, email),
            //     });

            //     if (isExist) {
            //         return next(CustomErrorHandler.alreadyExist("User already exists"));
            //     }

            //     // Hash password
            //     const genSalt = await bcrypt.genSalt(Number(config.SALT));
            //     const hashedPassword = await bcrypt.hash(password, genSalt);

            //     let newUser: any;

            //     // Use transaction for user creation and role-specific inserts
            //     await db.transaction(async (tx) => {
            //         newUser = (await tx
            //             .insert(users)
            //             .values({
            //                 name,
            //                 email,
            //                 password: hashedPassword,
            //                 role,
            //             })
            //             .returning());

            //         if (newUser.length === 0) {
            //             throw new Error("User creation failed.");
            //         }

            //         if (role === UserRole.STUDENT) {
            //             await tx.insert(students).values({
            //                 name,
            //                 user_id: newUser[0].id,
            //             });
            //         } else if (role === UserRole.ORGANIZATION) {
            //             await tx.insert(organizations).values({
            //                 name,
            //                 user_id: newUser[0].id,
            //             });
            //         }
            //     });

            //     // Send success email
            //     await sendEmail(email, "Welcome to ScholarX", welcomeEmail());

            //     const payload: JwtPayload = { id: newUser[0].id };

            //     const accessToken = jwt.sign(payload, config.JWT_SECRET, {
            //         expiresIn: "1h",
            //     });
            //     const refreshToken = jwt.sign(payload, config.JWT_SECRET, {
            //         expiresIn: "7d",
            //     });

            //     await db
            //         .update(users)
            //         .set({
            //             refresh_token: refreshToken,
            //         })
            //         .where(eq(users.id, newUser[0].id));

            //     // Send success response
            //     return res
            //         .status(201)
            //         .cookie("refresh_token", refreshToken, {
            //             httpOnly: true,
            //             sameSite: "strict",
            //             secure: process.env.NODE_ENV === "production",
            //             maxAge: 7 * 24 * 60 * 60 * 1000,
            //         })
            //         .cookie("access_token", accessToken, {
            //             httpOnly: true,
            //             sameSite: "strict",
            //             secure: process.env.NODE_ENV === "production",
            //             maxAge: 60 * 60 * 1000,
            //         })
            //         .send(
            //             ResponseHandler(201, "User registered successfully", {
            //                 id: newUser[0].id,
            //                 role: newUser[0].role,
            //                 access_token: accessToken,
            //             })
            //         );
            // }
        },
    },
};

export default authResolver;

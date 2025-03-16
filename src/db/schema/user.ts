import {
    pgTable,
    timestamp,
    uuid,
    varchar
} from "drizzle-orm/pg-core";

const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name").notNull(),
    email: varchar("email").notNull().unique(),
    password: varchar("password").notNull(),
    refresh_token: varchar("refresh_token"),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
});

export default users;

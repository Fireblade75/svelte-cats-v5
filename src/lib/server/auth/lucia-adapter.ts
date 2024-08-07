import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle"
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core"
import db from "$lib/server/db/drizzle-client"

const userTable = sqliteTable("user", {
	id: text("id").notNull().primaryKey()
})

const sessionTable = sqliteTable("session", {
	id: text("id").notNull().primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	expiresAt: integer("expires_at").notNull()
})

export const luciaAdapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable)
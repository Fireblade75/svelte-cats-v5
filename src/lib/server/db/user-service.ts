import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core"
import db from "$lib/server/db/drizzle-client"
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt"

const saltRounds = 10;

export type User = {
    userId: number,
    username: string,
    password: string
}

export type ValidationResult = {
    /**
     * The userId of the user if the password was correct
     */
    userId?: number,
    /**
     * valid is true if the user exists and the password is correct
     */
    valid: boolean
}

export const userTable = sqliteTable("user", {
	id: integer("id").notNull().primaryKey(),
    username: text('username').notNull(),
    hash: text('hash').notNull()
})

/**
 * Create a new user based on the provided infromation and inserts it into the database
 * @param username username (must be unique)
 * @param password plaintext password
 * @throws if the username is not unique or a database error occurs
 * @returns the newly generated user object
 */
export async function insertUser(username: string, password: string) {
    username = username.toLowerCase()
    const hash = await bcrypt.hash(password, saltRounds)
    const existingUsers = await getUserByUsername(username)
    if (existingUsers !== null) {
        throw new Error("username is already in use");
    }

    return await db.insert(userTable).values({username, hash})
}

export async function getUsername(id: number) {
    const resultList = await db.select().from(userTable).where(eq(userTable.id, id)).limit(1)
    if (resultList.length > 0) {
        return resultList[0].username
    }
    return null
}

export async function getUserByUsername(username: string) {
    const resultList = await db.select().from(userTable).where(eq(userTable.username, username)).limit(1)
    if (resultList.length > 0) {
        return resultList[0]
    }
    return null
}

/**
 * Validates the users password against the user in the database
 * @param username username of the user
 * @param password the plaintext password
 * @returns the userId and validation result
 */
export async function validatePassword(username: string, password: string): Promise<ValidationResult> {
    const user = await getUserByUsername(username)
    
    if (user === null) {
        return { valid: false }
    }

    return {
        valid: await bcrypt.compare(password, user.hash),
        userId: user.id
    }
}

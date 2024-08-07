import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import db from "$lib/server/db/drizzle-client"
import { eq } from "drizzle-orm";

export type Cat = {
    catId: number,
    name: string,
    color: string,
    age: number
}

const catTable = sqliteTable('cat', {
    catId: integer('cat_id').notNull().primaryKey(),
    name: text('name').notNull(),
    color: text('color').notNull(),
    age: integer('age').notNull()
})

export async function getAllCats() {
    return await db.select().from(catTable).all() satisfies Cat[]
}

export async function insertCat(cat: Omit<Cat, 'catId'>) {
    await db.insert(catTable).values(cat)
}

export async function deleteCat(catId: number) {
    await db.delete(catTable).where(eq(catTable.catId, catId))
}

export async function getCatByName(name: string) {
    const resultList = await db.select().from(catTable).where(eq(catTable.name, name)).limit(1)
    if (resultList.length > 0) {
        return resultList[0]
    }
    return null
}
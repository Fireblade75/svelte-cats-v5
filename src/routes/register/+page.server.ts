import { fail, redirect } from "@sveltejs/kit"
import type { Actions } from "./$types"
import { z } from 'zod'
import { insertCat, getCatByName } from "$lib/server/db/cat-service"
import { getUserByUsername, insertUser } from "$lib/server/db/user-service"

export const actions: Actions = {
    register: async ({ request, locals }) => {
        // Validate the user input
        const user = parseUserInput(await request.formData())
        if (user === null) {
            return fail(400, { error: 'Invalid input data', user: undefined})
        }

        if (await getUserByUsername(user.username)) {
            return fail(400, { error: 'Username must be unique', user})
        }

        // Insert the new cat into the database
        await insertUser(user.username, user.password)

        // Redirect the user to the login page, so they can see they can login
        throw redirect(303, '/login')
    }
}

function parseUserInput(data: FormData) {
    try {
        return userSchema.parse(Object.fromEntries(data))
    } catch (e) {
        console.error(e)
        return null
    }
}

const userSchema = z.object({
    username: z.string().min(1).max(256),
    password: z.string().min(1).max(512),
})

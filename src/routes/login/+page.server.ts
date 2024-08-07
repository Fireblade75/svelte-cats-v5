import { fail, redirect } from "@sveltejs/kit"
import type { Actions } from "./$types"
import { z } from 'zod'
import { insertCat, getCatByName } from "$lib/server/db/cat-service"
import { getUserByUsername, insertUser, validatePassword } from "$lib/server/db/user-service"
import { lucia } from "$lib/server/auth/lucia"

export const actions: Actions = {
    login: async ({ request, cookies }) => {
        // Validate the user input
        const user = parseUserInput(await request.formData())
        if (user === null) {
            return fail(400, { error: 'Invalid input data', user: undefined})
        }

        const result = await validatePassword(user.username, user.password)
        if (!result.valid || result.userId === undefined) {
            return fail(400, { error: 'Username or password is incorrect', user: user})
        }

        const session = await lucia.createSession('' + result.userId, {})
		const sessionCookie = lucia.createSessionCookie(session.id)
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		})

        // Redirect the user to the add-cat page, so they can see they can add new cats
        throw redirect(303, '/add-cat')
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

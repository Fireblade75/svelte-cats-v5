import { getUsername } from "$lib/server/db/user-service"
import { redirect } from "@sveltejs/kit"
import type { Actions } from "./$types"
import { lucia } from "$lib/server/auth/lucia"

export async function load({ locals }) {
    const userId = Number(locals.user?.id)
    const username = Number.isFinite(userId) ? await getUsername(userId) : null

	return {
        username
    }
}

export const actions: Actions = {
    logout: async ({ request, cookies, locals }) => {
        const userId = locals.user?.id


        await lucia.invalidateUserSessions(userId)
        const sessionCookie = await lucia.createBlankSessionCookie()
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		})

        // Redirect the user to the add-cat page, so they can see they can add new cats
        throw redirect(303, '/')
    }
}
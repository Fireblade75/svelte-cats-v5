import { getUsername } from "$lib/server/db/user-service"

export async function load({ locals }) {
    const userId = Number(locals.user?.id)
    const username = Number.isFinite(userId) ? await getUsername(userId) : null

	return {
        username
    }
}

import { fail, redirect } from "@sveltejs/kit"
import { getAllCats, deleteCat } from '$lib/server/db/cat-service.js'
import { z } from "zod"
import type { Actions } from "./$types"

export async function load({ params }) {
	return {
        cats: await getAllCats()
    }
}

export const actions: Actions = {
    deleteCat: async ({ request, locals }) => {
        // Validate the user input
        const catIdWrapper = parseInput(await request.formData())
        if (catIdWrapper === null) {
            return fail(400, { error: 'Invalid input data'})
        }

        // Insert the new cat into the database
        await deleteCat(catIdWrapper.catId)

        // Redirect the user to the list of cats, so they can see their newly created cat
        throw redirect(303, '/cat-list')
    }
}

function parseInput(data: FormData) {
    try {
        return idSchema.parse(Object.fromEntries(data))
    } catch (e) {
        console.error(e)
        return null
    }
}

const idSchema = z.object({
    catId: z.coerce.number().int()
})

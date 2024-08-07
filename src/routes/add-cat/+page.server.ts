import { fail, redirect } from "@sveltejs/kit"
import type { Actions } from "./$types"
import { z } from 'zod'
import { insertCat, getCatByName } from "$lib/server/db/cat-service"

export const actions: Actions = {
    addCat: async ({ request, locals }) => {
		if (!locals.user) {
			return fail(401, { error: 'Only registered users can create cats', cat: undefined});
		}

        // Validate the user input
        const cat = parseCatInput(await request.formData())
        if (cat === null) {
            return fail(400, { error: 'Invalid input data', cat: undefined})
        }

        if (cat.age < 0 || cat.age > 99) {
            return fail(400, { error: 'Cat age must be between 0 and 99 (inclusive)', cat})
        }

        if (await getCatByName(cat.name)) {
            return fail(400, { error: 'Cat name must be unique', cat})
        }

        // Insert the new cat into the database
        await insertCat(cat)

        // Redirect the user to the list of cats, so they can see their newly created cat
        throw redirect(303, '/cat-list')
    }
}

function parseCatInput(data: FormData) {
    try {
        return catSchema.parse(Object.fromEntries(data))
    } catch (e) {
        console.error(e)
        return null
    }
}

const catSchema = z.object({
    name: z.string(),
    age: z.coerce.number().int(),
    color: z.enum(['black', 'brown', 'gray', 'orange', 'white', 'yellow'])
})

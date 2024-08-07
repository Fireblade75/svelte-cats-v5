import { Lucia } from "lucia";
import { luciaAdapter } from "./lucia-adapter";

export const lucia = new Lucia(luciaAdapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: process.env.NODE_ENV === "production"
		}
	}
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
	}
}

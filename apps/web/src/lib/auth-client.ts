// authClient.ts
import { createAuthClient } from "better-auth/react";
const URL = import.meta.env.VITE_BETTER_AUTH_URL;

export const authClient = createAuthClient({
  baseURL: URL,
  fetchOptions: {
    credentials: "include",
  },
  // Optional: Define additional user fields for type safety
  additionalUserFields: {
    discordUsername: "string",
    trackId: "string",
  },
});

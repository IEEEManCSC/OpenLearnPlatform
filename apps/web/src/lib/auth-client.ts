// authClient.ts
import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

const URL = import.meta.env.VITE_BETTER_AUTH_URL;

export const authClient = createAuthClient({
  baseURL: URL,
  fetchOptions: {
    credentials: "include",
  },
  // Optional: Define additional user fields for type safety
  plugins: [
    inferAdditionalFields({
      user: {
        discordUsername: {
          type: "string",
        },
        trackId: {
          type: "string",
          required: false,
        },
      },
    }),
  ],
});

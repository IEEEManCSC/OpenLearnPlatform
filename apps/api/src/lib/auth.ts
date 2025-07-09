import { prismaAdapter } from "better-auth/adapters/prisma";
import { jwt, bearer, openAPI } from "better-auth/plugins";
import { betterAuth } from "better-auth";
import { prisma } from "./prisma";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true
    },
    appName: "api",
    plugins: [openAPI(), bearer(), jwt()],
});

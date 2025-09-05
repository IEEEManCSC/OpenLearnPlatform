import { prismaAdapter } from "better-auth/adapters/prisma";
import { jwt, bearer, openAPI, admin } from "better-auth/plugins";
import { betterAuth } from "better-auth";
import { prisma } from "./prisma.js";
import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

const statements = {
  ...defaultStatements,
  platform: ["use"],
} as const;

const ac = createAccessControl(statements);
const studentRole = ac.newRole({ platform: ["use"] });
const instructorRole = ac.newRole({ ...adminAc.statements });

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      discordUsername: {
        type: "string",
        required: true,
        returned: true,
      },
      trackId: {
        type: "string",
        required: false,
        returned: true,
      },
    },
  },
  appName: "api",
  trustedOrigins: ["http://localhost:5173", "https://olp.csc.ieeemansb.org"],
  plugins: [
    openAPI(),
    bearer(),
    jwt(),
    admin({
      ac,
      roles: {
        student: studentRole,
        instructor: instructorRole,
      },
      defaultRole: "student",
    }),
  ],
});

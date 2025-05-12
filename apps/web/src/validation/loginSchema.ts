import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .refine(
      (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || /^.{3,}$/.test(val),
      {
        message: "Must be a valid email or username with at least 3 characters",
      },
    ),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Za-z]/, "Password must contain letters")
    .regex(/\d/, "Password must contain numbers"),
  terms: z.boolean().optional(),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

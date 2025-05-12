import { z } from "zod";

export const helpCenterSchema = z.object({
  fullname: z.string().min(1, "Full name is required"),
  email: z
    .string()
    .min(3, "Email is required")
    .email("Invalid email address")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email format is incorrect"),

  message: z.string().min(5, "Message is required"),
});

export type HelpCenterFormValues = z.infer<typeof helpCenterSchema>;

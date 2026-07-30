import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z.string().trim().min(2),

    lastName: z.string().trim().min(2),

    email: z.email(),

    password: z
      .string()
      .min(8)
      .regex(/[A-Z]/, "Must contain an uppercase letter.")
      .regex(/[a-z]/, "Must contain a lowercase letter.")
      .regex(/[0-9]/, "Must contain a number."),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.email(),

  password: z.string().min(1),
});

export type LoginInput = z.infer<typeof loginSchema>;

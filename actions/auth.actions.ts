"use server";

import { signIn } from "@/auth";
import { register } from "@/services";
import { registerSchema } from "@/validations";

export async function registerAction(input: unknown) {
  const validated = registerSchema.safeParse(input);

  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten(),
    };
  }

  await register(validated.data);

  await signIn("credentials", {
    email: validated.data.email,
    password: validated.data.password,
    redirect: false,
  });

  return {
    success: true,
  };
}

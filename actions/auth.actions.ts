"use server";

import { signIn, signOut } from "@/auth";
import { register } from "@/services";
import { LoginInput, RegisterInput, registerSchema } from "@/validations";
import z from "zod";
import { AuthError } from "next-auth";

export async function loginAction(data: LoginInput) {
  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    return { success: true, message: "Login successful." };
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    throw error;
  }
}

export async function registerAction(input: RegisterInput) {
  const validated = registerSchema.safeParse(input);

  if (!validated.success) {
    return {
      success: false,
      errors: z.treeifyError(validated.error),
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

export async function logoutAction() {
  await signOut();

  return {
    success: true,
  };
}

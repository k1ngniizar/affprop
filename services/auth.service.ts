import { connectDB } from "@/lib/db";
import UserModel from "@/models/user.model";
import { RegisterInput } from "@/validations";
import bcrypt from "bcryptjs";

export async function register(data: RegisterInput) {
  await connectDB();

  const existingUser = await UserModel.findOne({
    email: data.email,
  });

  if (existingUser) {
    throw new Error("An account with this email already exists.");
  }

  const hashedPassword = await bcrypt.hash(data.password, 12);

  const user = await UserModel.create({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: hashedPassword,
  });

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
  };
}

export async function validateCredentials(email: string, password: string) {
  await connectDB();
  const user = await UserModel.findOne({
    email,
  }).select("+password");

  if (!user) {
    return null;
  }

  const matches = await bcrypt.compare(password, user.password);

  if (!matches) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    name: `${user.firstName} ${user.lastName}`,
    role: user.role,
  };
}

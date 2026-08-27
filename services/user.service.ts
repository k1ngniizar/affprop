import { connectDB } from "@/lib/db";
import { User } from "@/models/index";

export async function getUserById(id: string) {
  await connectDB();
  const user = await User.findById(id).select("-password");
  return user;
}

export async function getAllUsers() {
  await connectDB();
  const users = await User.find().select("-password");
  return users;
}

export async function deleteUser(id: string) {
  await connectDB();
  const user = await User.findByIdAndDelete(id);
  return user;
}

export async function updateUserDetails(id: string, data: any) {
  await connectDB();
  const updatedDetails = await User.findByIdAndUpdate(id, data).select(
    "-password",
  );
  return updatedDetails;
}

"use server";

import { auth } from "@/auth";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUserDetails,
} from "@/services/user.service";

export const getUserByIdAction = async (id: string) => {
  try {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");

    const user = await getUserById(id);
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsersAction = async () => {
  try {
    const session = await auth();
    if (!session?.user?.id || session?.user?.role !== "ADMIN")
      throw new Error("Unauthorized");

    const users = await getAllUsers();
    return users;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserDetailsAction = async (id: string, data: any) => {
  try {
    const session = await auth();
    if (!session?.user?.id || session?.user?.role !== "ADMIN")
      throw new Error("Unauthorized");

    const user = await updateUserDetails(id, data);
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserAction = async (id: string) => {
  try {
    const session = await auth();
    if (!session?.user?.id && session?.user?.role !== "ADMIN")
      throw new Error("Unauthorized");

    const user = await deleteUser(id);
    return user;
  } catch (error) {
    console.log(error);
  }
};

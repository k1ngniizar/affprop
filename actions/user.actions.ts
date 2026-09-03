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
    // const session = await auth();
    // if (!session?.user?.id) throw new Error("Unauthorized");

    const user = await getUserById(id);
    if (!user) return { success: false, error: "User not found" };
    return { success: true, data: JSON.parse(JSON.stringify(user)) };
  } catch (error: any) {
    console.log("Error fetching user:", error);
    return { success: false, error: error.message || "Failed to fetch user" };
  }
};

export const getAllUsersAction = async () => {
  try {
    const session = await auth();
    if (!session?.user?.id || session?.user?.role !== "ADMIN") {
      throw new Error("Unauthorized: Admin access required");
    }

    const users = await getAllUsers();
    return { success: true, data: JSON.parse(JSON.stringify(users)) };
  } catch (error: any) {
    console.log("Error fetching all users:", error);
    return { success: false, error: error.message || "Failed to fetch users" };
  }
};

export const updateUserDetailsAction = async (id: string, data: any) => {
  try {
    const session = await auth();
    if (
      !session?.user?.id ||
      !(session?.user?.id === id || session?.user?.role === "ADMIN")
    ) {
      throw new Error("Unauthorized");
    }

    const user = await updateUserDetails(id, data);
    if (!user) return { success: false, error: "User update failed" };
    return { success: true, data: JSON.parse(JSON.stringify(user)) };
  } catch (error: any) {
    console.log("Error updating user:", error);
    return { success: false, error: error.message || "Failed to update user" };
  }
};

export const deleteUserAction = async (id: string) => {
  try {
    const session = await auth();
    if (
      !session?.user?.id ||
      !(session?.user?.id === id || session?.user?.role === "ADMIN")
    ) {
      throw new Error("Unauthorized");
    }

    const user = await deleteUser(id);
    return { success: true, data: JSON.parse(JSON.stringify(user)) };
  } catch (error: any) {
    console.log("Error deleting user:", error);
    return { success: false, error: error.message || "Failed to delete user" };
  }
};

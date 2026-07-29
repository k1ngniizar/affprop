import { USER_ROLES } from "@/constants";

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export interface IUser {
  _id: string;

  firstName: string;

  lastName: string;

  email: string;

  password?: string;

  avatar?: string;

  phoneNumber?: string;

  role: UserRole;

  isVerified: boolean;

  createdAt: Date;

  updatedAt: Date;
}

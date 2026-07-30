import {
  Schema,
  model,
  models,
  InferSchemaType,
  HydratedDocument,
} from "mongoose";
import { USER_ROLE_VALUES, USER_ROLES } from "@/constants";

// Mongoose Schema defining the user data model and constraints.
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      select: false,
    },

    avatar: String,

    phoneNumber: String,

    role: {
      type: String,
      enum: USER_ROLE_VALUES,
      default: USER_ROLES.USER,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export type UserSchema = InferSchemaType<typeof userSchema>;

export type UserDocument = HydratedDocument<UserSchema>;

//  User Mongoose Model (compiles new model or reuses existing instance in Next.js hot-reloading).
const UserModel = models.User || model<UserSchema>("User", userSchema);

export default UserModel;

"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";

import {
  createProperty,
  deleteProperty,
  getAllPropertiesByCreatorId,
  getProperties,
  getPropertyById,
  updateProperty,
} from "@/services";

import {
  createPropertySchema,
  type CreatePropertyInput,
  updatePropertySchema,
  type UpdatePropertyInput,
} from "@/validations";
import z from "zod";
import { PropertySchema } from "@/models/property.model";

export async function createPropertyAction(
  input: CreatePropertyInput,
  image: { publicId: string; url: string },
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized.");
  }

  const data = createPropertySchema.safeParse(input);

  if (!data.success) {
    return {
      success: false,
      errors: z.treeifyError(data.error),
    };
  }

  const result = await createProperty(data.data, session.user.id, image);
  console.log(result);

  // console.log("Property log for debugging:: ", property);

  revalidatePath("/dashboard/properties");
  revalidatePath("/properties");
  return {
    success: true,
  };
}

export async function updatePropertyAction(
  propertyId: string,
  input: Partial<PropertySchema>,
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized.");
  }

  // const data = updatePropertySchema.parse(input);

  await updateProperty(propertyId, session.user.id, input);

  revalidatePath("/dashboard/properties");
  revalidatePath(`/properties/${propertyId}`);
}

export async function deletePropertyAction(propertyId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized.");
  }

  await deleteProperty(propertyId, session.user.id);

  revalidatePath("/dashboard/properties");

  revalidatePath("/properties");
}

export async function getPropertyAction(propertyId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("unauthorized.");
  }

  const data = await getPropertyById(propertyId);
  console.log("Data check:: ", data);

  // if (!data) return;
  // const data = await res.json();
  return {
    success: true,
    data: {
      ...data,
      _id: data._id.toString(),
      owner: data.owner._id.toString(),
    },
  };
}

export async function getAllPropertiesAction() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("unauthorized.");
  }

  const data = await getProperties();
  console.log("Data check:: ", data);

  // if (!data) return;
  // const data = await res.json();
  return {
    success: true,
    data: data.map((property) => ({
      ...property,
      _id: property._id.toString(),
      owner: property.owner._id.toString(),
    })),
  };
}

export async function getAllPropertiesByCreatorIdAction() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("unauthorized.");
  }

  const data = await getAllPropertiesByCreatorId(session.user.id);
  console.log("Data check:: ", data);

  return {
    success: true,
    data: data.map((property) => ({
      ...property,
      _id: property._id.toString(),
      owner: property.owner._id.toString(),
    })),
  };
}

export async function getPropertiesByTargetUserIdAction(userId: string) {
  try {
    const data = await getAllPropertiesByCreatorId(userId);
    return {
      success: true,
      data: data.map((property) => ({
        ...property,
        _id: property._id.toString(),
        owner: property.owner._id.toString(),
      })),
    };
  } catch (error: any) {
    console.log("Error fetching target user properties:", error);
    return { success: false, data: [] };
  }
}

"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";

import {
  createProperty,
  deleteProperty,
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
}

export async function updatePropertyAction(
  propertyId: string,
  input: UpdatePropertyInput,
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized.");
  }

  const data = updatePropertySchema.parse(input);

  await updateProperty(propertyId, session.user.id, data);

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
      owner: data.owner.toString(),
    },
  };
}

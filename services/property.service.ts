import { connectDB } from "@/lib/db";
import PropertyModel, { PropertySchema } from "@/models/property.model";
import type { CreatePropertyInput, UpdatePropertyInput } from "@/validations";

export async function getProperties() {
  await connectDB();

  return PropertyModel.find().lean();
}

export async function getPropertyById(id: string) {
  await connectDB();

  const property = await PropertyModel.findById(id).populate("owner").lean();

  if (!property) {
    throw new Error("Property not found.");
  }

  return property;
}

export async function createProperty(
  data: CreatePropertyInput,
  ownerId: string,
) {
  const matchModelData: PropertySchema<Partial> = {
    title: data.title,
    description: data.description,
    price: data.price,
    propertyType: data.propertyType,
    listingType: data.listingType,
  };
  await connectDB();

  return PropertyModel.create({
    ...data,
    owner: ownerId,
  });
}

export async function updateProperty(
  propertyId: string,
  userId: string,
  data: UpdatePropertyInput,
) {
  await connectDB();

  const property = await PropertyModel.findById(propertyId);

  if (!property) {
    throw new Error("Property not found.");
  }

  if (property.owner.toString() !== userId) {
    throw new Error("Unauthorized.");
  }

  Object.assign(property, data);

  await property.save();

  return property;
}

export async function deleteProperty(propertyId: string, userId: string) {
  await connectDB();

  const property = await PropertyModel.findById(propertyId);

  if (!property) {
    throw new Error("Property not found.");
  }

  if (property.owner.toString() !== userId) {
    throw new Error("Unauthorized.");
  }

  // Later...
  // delete images from Cloudinary

  await property.deleteOne();

  return {
    message: "Property deleted successfully.",
  };
}

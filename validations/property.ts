import { z } from "zod";
import {
  LISTING_TYPE_VALUES,
  PROPERTY_STATUS_VALUES,
  PROPERTY_TYPE_VALUES,
} from "@/constants";

export const createPropertySchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Title must be at least 5 characters.")
    .max(100, "Title cannot exceed 100 characters."),

  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters."),

  price: z.number().positive("Price must be greater than zero."),

  propertyType: z.enum(PROPERTY_TYPE_VALUES),

  listingType: z.enum(LISTING_TYPE_VALUES),

  bedrooms: z.number().int().min(0),

  bathrooms: z.number().int().min(0),

  parking: z.number().int().min(0),

  area: z.number().positive(),

  location: z.object({
    address: z.string().min(5),

    city: z.string().min(2),

    state: z.string().min(2),

    country: z.string().min(2),

    latitude: z.number(),

    longitude: z.number(),
  }),

  images: z.array(
    z.object({
      publicId: z.string(),

      url: z.url(),
    }),
  ),
});

export type CreatePropertyInput = z.infer<typeof createPropertySchema>;

export const updatePropertySchema = createPropertySchema.partial();

export type UpdatePropertyInput = z.infer<typeof updatePropertySchema>;

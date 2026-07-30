import {
  Schema,
  model,
  models,
  InferSchemaType,
  HydratedDocument,
} from "mongoose";
import {
  PROPERTY_TYPE_VALUES,
  LISTING_TYPE_VALUES,
  PROPERTY_STATUS_VALUES,
  PROPERTY_STATUS,
} from "@/constants";

// Embedded schema representing property image metadata.
const imageSchema = new Schema(
  {
    publicId: String,

    url: String,
  },
  {
    _id: false,
  },
);

// Embedded schema representing geographical and postal location details.
const locationSchema = new Schema(
  {
    address: String,

    city: String,

    state: String,

    country: String,

    latitude: Number,

    longitude: Number,
  },
  {
    _id: false,
  },
);

// Main Mongoose Schema for real estate property documents.
const propertySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    propertyType: {
      type: String,
      enum: PROPERTY_TYPE_VALUES,
      required: true,
    },

    listingType: {
      type: String,
      enum: LISTING_TYPE_VALUES,
      required: true,
    },

    status: {
      type: String,
      enum: PROPERTY_STATUS_VALUES,
      default: PROPERTY_STATUS.AVAILABLE,
    },

    bedrooms: Number,

    bathrooms: Number,

    parking: Number,

    area: Number,

    images: [imageSchema],

    location: locationSchema,

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

// Text search index for full-text queries on title and description.
propertySchema.index({
  title: "text",
  description: "text",
});

// Compound index for location-based property queries by city and state
propertySchema.index({
  "location.city": 1,
  "location.state": 1,
});

// Index for sorting and filtering by price
propertySchema.index({
  price: 1,
});

// Index for sorting listings by creation date
propertySchema.index({
  createdAt: 1,
});

export type PropertySchema = InferSchemaType<typeof propertySchema>;

export type PropertyDocument = HydratedDocument<PropertySchema>;

//  Property Mongoose Model (compiles new model or reuses existing instance in Next.js hot-reloading)
const PropertyModel =
  models.Property || model<PropertySchema>("Property", propertySchema);

export default PropertyModel;

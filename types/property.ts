import { LISTING_TYPES, PROPERTY_STATUS, PROPERTY_TYPES } from "@/constants";

export interface PropertyImage {
  publicId: string;

  url: string;
}

export interface Location {
  address: string;

  city: string;

  state: string;

  country: string;

  latitude: number;

  longitude: number;
}

export type PropertyType = (typeof PROPERTY_TYPES)[keyof typeof PROPERTY_TYPES];

export type ListingType = (typeof LISTING_TYPES)[keyof typeof LISTING_TYPES];

export type PropertyStatus =
  (typeof PROPERTY_STATUS)[keyof typeof PROPERTY_STATUS];

export interface IProperty {
  _id: string;

  title: string;

  description: string;

  price: number;

  propertyType: PropertyType;

  listingType: ListingType;

  status: PropertyStatus;

  bedrooms: number;

  bathrooms: number;

  parking: number;

  area: number;

  images: PropertyImage[];

  location: Location;

  owner: string;

  views: number;

  createdAt: Date;

  updatedAt: Date;
}

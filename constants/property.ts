export const PROPERTY_TYPES = {
  APARTMENT: "Apartment",
  DUPLEX: "Duplex",
  BUNGALOW: "Bungalow",
  TERRACE: "Terrace",
  DETACHED: "Detached House",
  SEMI_DETACHED: "Semi-Detached House",
  PENTHOUSE: "Penthouse",
  STUDIO: "Studio Apartment",
  LAND: "Land",
  OFFICE: "Office Space",
  SHOP: "Shop",
  WAREHOUSE: "Warehouse",
} as const;

export const LISTING_TYPES = {
  SALE: "Sale",
  RENT: "Rent",
} as const;

export const PROPERTY_STATUS = {
  AVAILABLE: "Available",
  PENDING: "Pending",
  SOLD: "Sold",
  RENTED: "Rented",
} as const;

export const PROPERTY_TYPE_VALUES = Object.values(PROPERTY_TYPES);

export const LISTING_TYPE_VALUES = Object.values(LISTING_TYPES);

export const PROPERTY_STATUS_VALUES = Object.values(PROPERTY_STATUS);
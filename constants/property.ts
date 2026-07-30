/**
 * Supported real estate property types available on the platform.
 */
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

/**
 * Supported property listing transaction types (Sale vs Rent).
 */
export const LISTING_TYPES = {
  SALE: "Sale",
  RENT: "Rent",
} as const;

/**
 * Operational lifecycle statuses for a property listing.
 */
export const PROPERTY_STATUS = {
  AVAILABLE: "Available",
  PENDING: "Pending",
  SOLD: "Sold",
  RENTED: "Rented",
} as const;

/**
 * Array of all valid property type values, used for Mongoose schema enum validation.
 */
export const PROPERTY_TYPE_VALUES = Object.values(PROPERTY_TYPES);

/**
 * Array of all valid listing type values, used for Mongoose schema enum validation.
 */
export const LISTING_TYPE_VALUES = Object.values(LISTING_TYPES);

/**
 * Array of all valid property status values, used for Mongoose schema enum validation.
 */
export const PROPERTY_STATUS_VALUES = Object.values(PROPERTY_STATUS);

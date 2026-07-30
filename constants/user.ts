/**
 * User role definitions used for authorization and access control across the application.
 */
export const USER_ROLES = {
  USER: "USER",
  AGENT: "AGENT",
  ADMIN: "ADMIN",
} as const;

/**
 * Array of all valid user role string values, used for schema validation (e.g. Mongoose enum).
 */
export const USER_ROLE_VALUES = Object.values(USER_ROLES);

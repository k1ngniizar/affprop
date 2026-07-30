import mongoose from "mongoose";

/**
 * MongoDB URI retrieved from environment variables.
 */
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

/**
 * Extends Node's global object interface to cache the Mongoose connection state.
 * This prevents creating duplicate database connections across hot-reloads in Next.js development.
 */
declare global {
  // eslint-disable-next-line no-var
  var mongooseConnection:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

/**
 * Retrieve cached connection from global object or initialize an empty cache object.
 */
const cached = global.mongooseConnection ?? {
  conn: null,
  promise: null,
};

global.mongooseConnection = cached;

/**
 * Establishes or reuses an existing Mongoose database connection.
 * Essential for Serverless / Next.js environments to avoid connection pool exhaustion.
 *
 * @returns {Promise<typeof mongoose>} The active Mongoose instance.
 */

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI as string)
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;

  return cached.conn;
}

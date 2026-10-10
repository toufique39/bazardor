
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is not defined");
}

const dbName = process.env.MONGODB_DB || "bazardor";

const options = {
  tls: true,
  serverSelectionTimeoutMS: 15000,
};

const globalForMongo = globalThis;

const client =
  globalForMongo.__bazardorMongoClient ??
  new MongoClient(uri, options);

// Reuse the same client in development and production.
globalForMongo.__bazardorMongoClient = client;

const db = client.db(dbName);

export { client, db };

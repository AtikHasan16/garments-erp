import mongoose from 'mongoose';
import { MongoClient, ServerApiVersion } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// MongoClient Options with Stable API v1
const mongoClientOptions = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

// Global cache for Mongoose and MongoClient
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn && cached.conn.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      ...mongoClientOptions,
      bufferCommands: false,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4, // Force IPv4 for Windows dual-stack SSL stability
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log('Pinged your deployment. You successfully connected to MongoDB Atlas!');
        return mongooseInstance;
      })
      .catch((err) => {
        console.error('MongoDB Atlas Connection Error:', err.message);
        cached.promise = null;
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// Native MongoClient export for standalone driver calls
let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI, mongoClientOptions);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(MONGODB_URI, mongoClientOptions);
  clientPromise = client.connect();
}

export { clientPromise };

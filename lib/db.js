
import { MongoClient } from 'mongodb';
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let cachedDbPromise = null;

export async function connectToDatabase() {
  if (cachedDbPromise) {
    // If a database connection promise is already cached, wait for it to resolve
    return cachedDbPromise;
  }

  try {
    const newDbPromise = client.connect().then(() => {
      const db = client.db('test');
      return db;
    });

    cachedDbPromise = newDbPromise;

    return newDbPromise;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

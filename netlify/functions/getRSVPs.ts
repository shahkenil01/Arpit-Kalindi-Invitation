import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
const dbName = process.env.MONGODB_DB as string;
const collectionName = process.env.MONGODB_COLLECTION as string;

let cachedClient: MongoClient | null = null;

async function getClient() {
  if (!uri) throw new Error('MONGODB_URI missing');
  if (cachedClient) return cachedClient;

  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}

export const handler = async () => {
  try {
    const client = await getClient();
    const collection = client.db(dbName).collection(collectionName);

    const rsvps = await collection
      .find({})
      .sort({ timestamp: -1 })
      .toArray();

    return {
      statusCode: 200,
      body: JSON.stringify(rsvps),
    };
  } catch (err) {
    console.error('getRSVPs error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error' }),
    };
  }
};

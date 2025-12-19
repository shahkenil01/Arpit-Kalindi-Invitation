import { MongoClient, ObjectId } from 'mongodb';

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

export const handler = async (event: any) => {
  if (event.httpMethod !== 'DELETE') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { id } = JSON.parse(event.body);

    const client = await getClient();
    const collection = client.db(dbName).collection(collectionName);

    await collection.deleteOne({ _id: new ObjectId(id) });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error('deleteRSVP error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error' }),
    };
  }
};

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

function normalizeName(name: string) {
  return name
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .sort()
    .join(' ');
}

export const handler = async (event: any) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);

    const fullName = data.fullName.trim();
    const fullNameKey = normalizeName(fullName);

    const client = await getClient();
    const collection = client.db(dbName).collection(collectionName);

    // 🔒 DUPLICATE CHECK
    const existing = await collection.findOne({ fullNameKey });
    if (existing) {
      return {
        statusCode: 409,
        body: JSON.stringify({
          message:
            'You have already submitted your response. Kindly contact Arpit.',
        }),
      };
    }

    await collection.insertOne({
      ...data,
      fullName,        // original casing preserved
      fullNameKey,     // internal use only
      timestamp: new Date(),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error('saveRSVP error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false }),
    };
  }
};

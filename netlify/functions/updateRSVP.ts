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
  if (event.httpMethod !== 'PUT') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { id, inviteType, guestCount } = JSON.parse(event.body);

    // HARD VALIDATION
    if (inviteType === 'small' && guestCount > 2) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Small invite allows max 2 guests only.',
        }),
      };
    }

    if (inviteType === 'family' && guestCount > 6) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Family invite allows max 6 guests only.',
        }),
      };
    }

    const client = await getClient();
    const collection = client.db(dbName).collection(collectionName);

    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { inviteType, guestCount } }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error('updateRSVP error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error' }),
    };
  }
};

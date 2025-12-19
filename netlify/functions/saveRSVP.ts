import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
const dbName = process.env.MONGODB_DB as string;
const collectionName = process.env.MONGODB_COLLECTION as string;

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

    const client = new MongoClient(uri);
    await client.connect();

    const collection = client.db(dbName).collection(collectionName);

    // 🔒 DUPLICATE CHECK
    const existing = await collection.findOne({ fullNameKey });
    if (existing) {
      await client.close();
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

    await client.close();

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false }),
    };
  }
};

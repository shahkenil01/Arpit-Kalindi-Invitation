import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
const dbName = process.env.MONGODB_DB as string;
const collectionName = process.env.MONGODB_COLLECTION as string;

export const handler = async (event: any) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);

    const normalizedName = data.fullName.trim().toLowerCase();

    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const existing = await collection.findOne({
      fullName: normalizedName,
    });

    if (existing) {
      await client.close();
      return {
        statusCode: 409,
        body: JSON.stringify({
          message: "You’ve already responded. Kindly contact Arpit.",
        }),
      };
    }

    await collection.insertOne({
      ...data,
      fullName: normalizedName,
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
      body: JSON.stringify({ success: false, error: 'DB error' }),
    };
  }
};

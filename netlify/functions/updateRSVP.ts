import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
const dbName = process.env.MONGODB_DB as string;
const collectionName = process.env.MONGODB_COLLECTION as string;

export const handler = async (event: any) => {
  if (event.httpMethod !== 'PUT') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { id, guestCount, inviteType } = JSON.parse(event.body);

    const client = new MongoClient(uri);
    await client.connect();

    const collection = client.db(dbName).collection(collectionName);

    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { guestCount, inviteType } }
    );

    await client.close();

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false }),
    };
  }
};

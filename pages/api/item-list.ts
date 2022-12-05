import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

// Get list items correcponding to a particulat list
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
      try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);

        console.log("List id: ", JSON.parse(req.body).listId)

        let items = await db
            .collection('items')
            .find({listId: JSON.parse(req.body).listId})
            .toArray();

        return res.json({
            message: JSON.parse(JSON.stringify(items)),
            success: true,
        });

    } catch (error: any) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
  }
}
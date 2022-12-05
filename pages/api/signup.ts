import { setCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST')
  {
    try {
      if (!req.body) {
        throw new Error("Incomplete data")
      }
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DB);

      const p = await db.collection('users').findOne({name: req.body.name})
      if (p) 
      {
        console.log(p)
        throw new Error("User already exists")
      }
      const {insertedId} = await db.collection('users').insertOne(req.body);
      setCookie('id', insertedId, {req, res})
      return res.json({
          message: 'User added successfully',
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

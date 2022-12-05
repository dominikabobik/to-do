import { setCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

const TOKEN_AGE_SEC = 60 * 60 * 24 * 30;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST')
  {
    const body = JSON.parse(req.body)
    try {
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DB);
      console.log("Body: \n" + body)
      const user = await db.collection('users')
        .findOne({ name: body.name, password: body.password });
      
      console.log(user)
      if (!user) {
        throw new Error("User does not exist")
      }
    console.log(user)
    setCookie('id', user._id, { req, res, maxAge: TOKEN_AGE_SEC});
      
    return res.json({
        message: user,
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

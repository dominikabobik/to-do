import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getUser(req, res);
        }
        case 'POST': {
            return addUser(req, res);
        }
        case 'DELETE': {
            return deleteUser(req, res);
        }
    }
}

async function getUser(req: NextApiRequest, res: NextApiResponse<any>) {
      try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);
       
        let user = await db.collection('users')
          .findOne({ name: req.body.name, password: req.body.password });

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

async function addUser(req: NextApiRequest, res: NextApiResponse<any>) {
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
    
    await db.collection('users').insertOne(req.body);

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

function deleteUser(req: NextApiRequest, res: NextApiResponse<any>) {
  throw new Error("Function not implemented.");
}


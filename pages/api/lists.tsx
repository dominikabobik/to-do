import { NextApiRequest, NextApiResponse } from "next";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getLists(req, res);
        }

        case 'POST': {
            return addList(req, res);
        }

        case 'DELETE': {
            return deleteList(req, res);
        }
    }
}

// Getting all lists
async function getLists(req: NextApiRequest, res:NextApiResponse) {
    try {
        let { db } = await connectToDatabase();
        let lists = await db
          .collection('lists')
          .find({})
          .toArray();
      
        res.status(200).send(lists);
      
        return res.json(
            JSON.parse(JSON.stringify(lists))
        );
        
    } catch (error:any) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

// Adding a new list
async function addList(req: NextApiRequest, res:NextApiResponse) {
    try {
        let { db } = await connectToDatabase();
        await db.collection('lists').insertOne(JSON.parse(req.body));
        return res.json({
            message: 'List added successfully',
            success: true,
        });
    } catch (error:any) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

// deleting a list
async function deleteList(req: NextApiRequest, res:NextApiResponse) {
    try {
        let { db } = await connectToDatabase();

        await db.collection('lists').deleteOne({
            _id: new ObjectId(req.body),
        });

        return res.json({
            message: 'List deleted successfully',
            success: true,
        });
    } catch (error:any) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

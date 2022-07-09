import { NextApiRequest, NextApiResponse } from "next";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getTitles(req, res);
        }

        case 'POST': {
            return addTitle(req, res);
        }

        case 'DELETE': {
            return deleteTitle(req, res);
        }
    }
}

// Getting all titles.
async function getTitles(req: NextApiRequest, res:NextApiResponse) {
    try {
        let { db } = await connectToDatabase();
        let titles = await db
          .collection('titles')
          .find({})
          .toArray();
      
        res.status(200).send(titles);
      
        return res.json(
            JSON.parse(JSON.stringify(titles))
        );
        
    } catch (error:any) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

// Adding a new title
async function addTitle(req: NextApiRequest, res:NextApiResponse) {
    try {
        let { db } = await connectToDatabase();
        await db.collection('titles').insertOne(JSON.parse(req.body));
        return res.json({
            message: 'Post added successfully',
            success: true,
        });
    } catch (error:any) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

// deleting a title
async function deleteTitle(req: NextApiRequest, res:NextApiResponse) {
    try {
        let { db } = await connectToDatabase();

        await db.collection('titles').deleteOne({
            _id: new ObjectId(req.body),
        });

        return res.json({
            message: 'title deleted successfully',
            success: true,
        });
    } catch (error:any) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

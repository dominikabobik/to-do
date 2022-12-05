import { getCookie, getCookies } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
async function getLists(req: NextApiRequest, res: NextApiResponse) {
    try {
        const authHeader = req.headers.authorization
        const token = authHeader?.split(" ")[1];
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);
        console.log("---Token: ", token)
        console.log(authHeader)
        let lists = await db
            .collection('lists')
            .find({ userId: token })
            .toArray();

        console.log("ALL LISTS:", lists)
        //return res.status(200).json(lists)
        return res.json({
            message: JSON.parse(JSON.stringify(lists)),
            success: true,
        });

    } catch (error: any) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

// Adding a new list
async function addList(req: NextApiRequest, res: NextApiResponse) {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);
        await db.collection('lists').insertOne(JSON.parse(req.body));

        return res.json({
            message: 'List added successfully',
            success: true,
        });
    } catch (error: any) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

// deleting a list
async function deleteList(req: NextApiRequest, res: NextApiResponse) {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);

        console.log("Deleting id: ", JSON.parse(req.body).selfId)
        await db.collection('lists').deleteOne({
            id: JSON.parse(req.body).selfId,
        });

        return res.json({
            message: 'List deleted successfully',
            success: true,
        });
    } catch (error: any) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

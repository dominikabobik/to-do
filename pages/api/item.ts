import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getItems(req, res);
        }
        case 'POST': {
            return addItem(req, res);
        }
        case 'DELETE': {
            return deleteItem(req, res);
        }
        case 'PUT': {
            return putItem(req, res)    
        }
    }
}

// Getting all lists
async function getItems(req: NextApiRequest, res: NextApiResponse) {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);
        let items = await db
            .collection('items')
            .find({})
            .toArray();

        console.log(items)
        //return res.status(200).json(lists)
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

// Adding a new list
async function addItem(req: NextApiRequest, res: NextApiResponse) {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);
        await db.collection('items').insertOne(JSON.parse(req.body));

        return res.json({
            message: 'Item added successfully',
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
async function deleteItem(req: NextApiRequest, res: NextApiResponse) {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);

        console.log("Deleting id: ", JSON.parse(req.body).selfId)
        await db.collection('items').deleteOne({
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

// Updating existing record
async function putItem(req: NextApiRequest, res: NextApiResponse) {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);

        console.log("Updating id: ", JSON.parse(req.body).selfId)
        let ret = await db.collection('items')
            .updateOne({ "id": JSON.parse(req.body).selfId },
                {$set: {
                        "isChecked": JSON.parse(req.body).isChecked,
                        "value": JSON.parse(req.body).value}})
        console.log(ret)
        
        return res.json({
            message: 'Item updated successfully',
            success: true,
    });
    } catch (error: any) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}
import dbConnect from "@/lib/mongo/dbConnect";
import Collection from "@/models/Collection";
import { NextRequest } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: { collectionId: string } }) {

    try {
        const { collectionName }: { collectionName: string } = await request.json()
        await dbConnect()
        const updatedCollection = await Collection.findByIdAndUpdate(params.collectionId, { $set: { title: collectionName } })
        if (updatedCollection) {
            return Response.json(updatedCollection)
        }
        else {
            return Response.json("Ошибка одновления коллекции")
        }
    } catch (e) {
        return Response.json(e)
    }

} 
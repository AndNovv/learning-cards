import dbConnect from "@/lib/mongo/dbConnect";
import Collection from "@/models/Collection";
import { FlashCardType } from "@/types/types";
import { NextRequest } from "next/server";


// Edit collection
export async function PATCH(request: NextRequest, { params }: { params: { collectionId: string } }) {

    try {
        const { flashcards }: { flashcards: FlashCardType[] } = await request.json()
        const requestFlashcards = flashcards.map(({ _id, ...rest }) => rest)

        await dbConnect()
        const collection = await Collection.findById(params.collectionId)
        if (!collection) {
            return Response.json("Данная коллекция не найдена")
        }
        else {
            collection.flashcards = requestFlashcards
            const updatedCollection = await collection.save()
            return Response.json(updatedCollection)
        }
    }
    catch (e) {
        return Response.json(e)
    }
}


// Delete collection
export async function DELETE(_request: NextRequest, { params }: { params: { collectionId: string } }) {
    try {
        await dbConnect()
        const deletedCollection = await Collection.deleteOne({ _id: params.collectionId }).lean()
        if (!deletedCollection) {
            return Response.json("Данная коллекция не найдена")
        }
        else {
            return Response.json(deletedCollection)
        }
    }
    catch (e) {
        return Response.json(e)
    }
}
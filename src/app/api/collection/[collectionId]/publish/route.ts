import dbConnect from "@/lib/mongo/dbConnect";
import Collection from "@/models/Collection";
import PublishedCollection from "@/models/PublishedCollection";
import User from "@/models/User";
import { FlashCardType } from "@/types/types";

import { NextRequest } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { collectionId: string } }) {

    try {

        const { userId }: { userId: string } = await request.json()

        await dbConnect()
        const collection = await Collection.findById(params.collectionId).populate('flashcards')

        if (collection) {
            const flashcards = collection.flashcards.map((flashcard: FlashCardType) => ({ english: flashcard.english, russian: flashcard.russian }))
            const res = await PublishedCollection.create({ title: collection.title, authorId: userId, authorName: collection.author, flashcards })

            await User.findByIdAndUpdate(userId, { $push: { publishedCollections: res._id } })
            return Response.json(res)
        }
        else {
            return Response.json("Коллекция не найдена")
        }

    } catch (e) {
        console.log(e)
        return Response.json(JSON.stringify(e))
    }
}
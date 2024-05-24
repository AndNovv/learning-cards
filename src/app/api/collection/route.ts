import { validateAccessToken } from "@/lib/ValidateAccessToken";
import dbConnect from "@/lib/mongo/dbConnect";
import Collection from "@/models/Collection";
import Flashcard from "@/models/Flashcard";
import { ClientFlashCardType, FlashCardType } from "@/types/types";
import { NextRequest } from "next/server";


// Create collection
export async function POST(request: NextRequest) {

    const repetitionTime = Date.now()

    try {

        const result = await validateAccessToken(request)
        if (typeof result !== 'string') return result

        const { title, author, authorId, flashcards }: { title: string, author: string, authorId: string, flashcards: ClientFlashCardType[] } = await request.json()
        const requestFlashcards = flashcards.map(({ _id, ...flashcard }) => ({ ...flashcard, repetitionTime }))

        await dbConnect()

        const createdFlashcards: FlashCardType[] = await Flashcard.insertMany(requestFlashcards)

        const createdFlashcardsIds = createdFlashcards.map((flashcard) => flashcard._id)
        const collection = await Collection.create({ title, author, authorId, flashcards: createdFlashcardsIds, lastUpdateAt: new Date() })

        const resultCollection = await Collection.findById(collection._id).populate('flashcards')
        return Response.json(resultCollection)
    }
    catch (e) {
        return Response.json(e, {
            headers: {
                "Content-Type": "application/json",
            },
            status: 500,
        })
    }
}

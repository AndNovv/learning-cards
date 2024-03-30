import dbConnect from "@/lib/mongo/dbConnect";
import Collection, { ICollection } from "@/models/Collection";
import Flashcard from "@/models/Flashcard";
import { ClientFlashCardType, FlashCardType } from "@/types/types";
import { NextRequest } from "next/server";


// ADD collection
export async function POST(request: NextRequest) {

    const repetitionTime = Date.now()

    try {
        const { title, author, flashcards }: { title: string, author: string, flashcards: ClientFlashCardType[] } = await request.json()
        const requestFlashcards = flashcards.map(({ _id, ...flashcard }) => ({ ...flashcard, repetitionTime }))

        await dbConnect()

        const createdFlashcards: FlashCardType[] = await Flashcard.insertMany(requestFlashcards)

        const createdFlashcardsIds = createdFlashcards.map((flashcard) => flashcard._id)
        const collection = await Collection.create({ title, author, flashcards: createdFlashcardsIds })

        const result = await Collection.findById(collection._id).populate('flashcards')
        return Response.json(result)
    }
    catch (e) {
        return Response.json(e)
    }
}

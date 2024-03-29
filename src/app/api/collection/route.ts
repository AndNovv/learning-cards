import dbConnect from "@/lib/mongo/dbConnect";
import Collection from "@/models/Collection";
import { ClientFlashCardType } from "@/types/types";
import { NextRequest } from "next/server";


// ADD collection
export async function POST(request: NextRequest) {

    const repetitionTime = Date.now()

    try {
        const { title, author, flashcards }: { title: string, author: string, flashcards: ClientFlashCardType[] } = await request.json()
        const requestFlashcards = flashcards.map(({ _id, ...flashcard }) => ({ ...flashcard, repetitionTime }))

        await dbConnect()
        const collection = await Collection.create({ title, author, flashcards: requestFlashcards })
        return Response.json(collection)
    }
    catch (e) {
        return Response.json(e)
    }
}

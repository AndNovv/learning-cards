import dbConnect from "@/lib/mongo/dbConnect";
import Collection from "@/models/Collection";
import { FlashCardClientType } from "@/types/types";
import { NextRequest } from "next/server";


// ADD collection
export async function POST(request: NextRequest) {

    try {
        const { title, author, flashcards }: { title: string, author: string, flashcards: FlashCardClientType[] } = await request.json()
        console.log(title)
        console.log(author)
        console.log(flashcards)
        await dbConnect()
        const collection = await Collection.create({ title, author, flashcards })
        console.log(collection)
        return Response.json(collection)
    }
    catch (e) {
        return Response.json(e)
    }
}

import dbConnect from "@/lib/mongo/dbConnect";
import Collection from "@/models/Collection";
import { FlashCardType } from "@/types/types";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {

    try {
        const { title, flashcards }: { title: string, flashcards: FlashCardType[] } = await request.json()
        await dbConnect()
        const collection = await Collection.create({ title, author: 'Пользователь', flashcards })
        return Response.json(collection)
    }
    catch (e) {
        return Response.json(e)
    }
}
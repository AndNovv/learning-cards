import dbConnect from "@/lib/mongo/dbConnect";
import User from "@/models/User";
import Collection from "@/models/Collection"
import { NextRequest } from "next/server";
import Flashcard from "@/models/Flashcard";
import PublishedCollection from "@/models/PublishedCollection";


// GET all User Data
export async function GET(_request: NextRequest, { params }: { params: { email: string } }) {

    try {
        await dbConnect()

        await Flashcard.findOne({})
        await Collection.findOne({})
        await PublishedCollection.findOne({})

        const user = await User.findOne({ email: params.email })
            .populate({
                path: 'collections',
                populate: { path: 'flashcards' },
            })
            .populate('publishedCollections')

        if (user) {
            return Response.json(user)
        }
        return Response.json("Пользователь не найден", {
            headers: {
                "Content-Type": "application/json",
            },
            status: 400,
        })
    }
    catch (e) {
        return new Response(JSON.stringify(e), {
            headers: {
                "Content-Type": "application/json",
            },
            status: 400,
        })
    }
}
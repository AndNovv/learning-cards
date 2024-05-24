import dbConnect from "@/lib/mongo/dbConnect";
import User from "@/models/User";
import Collection from "@/models/Collection"
import { NextRequest } from "next/server";
import Flashcard from "@/models/Flashcard";
import PublishedCollection from "@/models/PublishedCollection";
import { validateAccessToken } from "@/lib/ValidateAccessToken";


// GET all User Data
export async function GET(request: NextRequest) {

    try {

        const result = await validateAccessToken(request)
        if (typeof result !== 'string') return result

        await dbConnect()

        await Flashcard.findOne({})
        await Collection.findOne({})
        await PublishedCollection.findOne({})

        const user = await User.findOne({ email: result })
            .populate({
                path: 'collections',
                populate: { path: 'flashcards' },
            })
            .populate('publishedCollections')

        if (!user) {
            return Response.json("User not found", {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 400,
            })
        }

        return Response.json(user)

    }
    catch (e) {
        return new Response(JSON.stringify(e), {
            headers: {
                "Content-Type": "application/json",
            },
            status: 500,
        })
    }
}
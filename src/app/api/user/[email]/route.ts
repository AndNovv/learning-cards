import dbConnect from "@/lib/mongo/dbConnect";
import User, { IUser } from "@/models/User";
import Collection from "@/models/Collection"
import { NextRequest } from "next/server";
import { WordCollection } from "@/types/types";
import Flashcard from "@/models/Flashcard";


// GET all User Data
export async function GET(_request: NextRequest, { params }: { params: { email: string } }) {

    try {
        await dbConnect()

        await Flashcard.findOne({})
        await Collection.findOne({})

        const user = await User.findOne({ email: params.email })
            .populate({
                path: 'collections',
                populate: { path: 'flashcards' }
            });

        if (user) {
            return Response.json(user)
        }
        return Response.json("Пользователь не найден")
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
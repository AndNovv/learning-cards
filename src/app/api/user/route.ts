import dbConnect from "@/lib/mongo/dbConnect";
import User from "@/models/User";
import { NextRequest } from "next/server";


// Create new user
export async function POST(request: NextRequest) {

    try {
        const { name, email }: { name: string, email: string } = await request.json()
        await dbConnect()
        const userExists = await User.findOne({ email })
        if (!userExists) {

            const user = await User.create({ name, email, flashcards: [], publishedCollections: [] })
            return Response.json(user)
        }
        else {
            return Response.json("Пользователь уже существует")
        }
    }
    catch (e) {
        console.log(e)
        return Response.json(e)
    }
}

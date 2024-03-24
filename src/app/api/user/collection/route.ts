import dbConnect from "@/lib/mongo/dbConnect";
import User from "@/models/User";
import { NextRequest } from "next/server";


// ADD collection to user
export async function POST(request: NextRequest) {
    try {
        const { userId, collectionId }: { userId: string, collectionId: string } = await request.json()
        await dbConnect()
        const user = await User.findById(userId)
        if (!user) {
            return Response.json("Пользователь не найден")
        }
        else {
            user.collections.push(collectionId)
            const updatedUser = await user.save()
            return Response.json(updatedUser)
        }
    }
    catch (e) {
        return Response.json(e)
    }
}

// Delete collection from user
export async function PATCH(request: NextRequest) {
    try {
        const { userId, collectionId }: { userId: string, collectionId: string } = await request.json()
        await dbConnect()
        const user = await User.findById(userId)
        if (!user) {
            return Response.json("Пользователь не найден")
        }
        else {
            user.collections.pull(collectionId)
            const updatedUser = await user.save()
            return Response.json(updatedUser)
        }
    }
    catch (e) {
        return Response.json(e)
    }
}
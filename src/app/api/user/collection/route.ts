import { validateAccessToken } from "@/lib/ValidateAccessToken";
import dbConnect from "@/lib/mongo/dbConnect";
import User from "@/models/User";
import { NextRequest } from "next/server";


// ADD collection to user
export async function POST(request: NextRequest) {
    try {

        const result = await validateAccessToken(request)
        if (typeof result !== 'string') return result

        const { userId, collectionId }: { userId: string, collectionId: string } = await request.json()

        await dbConnect()
        const user = await User.findById(userId)

        if (!user || user.email !== result) {
            return Response.json("User not found", {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 400,
            })
        }

        user.collections.push(collectionId)
        const updatedUser = await user.save()
        return Response.json(updatedUser)

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

// Delete collection from user
export async function PATCH(request: NextRequest) {
    try {

        const result = await validateAccessToken(request)
        if (typeof result !== 'string') return result

        const { userId, collectionId }: { userId: string, collectionId: string } = await request.json()
        await dbConnect()
        const user = await User.findById(userId)

        if (!user || user.email !== result) {
            return Response.json("User not found", {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 400,
            })
        }

        user.collections.pull(collectionId)
        const updatedUser = await user.save()
        return Response.json(updatedUser)

    }
    catch (e) {
        return Response.json(e)
    }
}
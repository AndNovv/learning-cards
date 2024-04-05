import dbConnect from "@/lib/mongo/dbConnect";
import User from "@/models/User";
import { NextRequest } from "next/server";

export async function GET(_request: NextRequest, { params }: { params: { userId: string } }) {

    try {
        await dbConnect()
        const UserWithpublishedCollections = await User.findById(params.userId).select("publishedCollections").populate("publishedCollections")

        if (UserWithpublishedCollections) {
            const publishedCollections = UserWithpublishedCollections.publishedCollections
            return Response.json(publishedCollections)
        }
        else {
            return new Response(JSON.stringify("Пользователь не найден"), {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 400,
            })
        }
    } catch (e) {
        return new Response(JSON.stringify(e), {
            headers: {
                "Content-Type": "application/json",
            },
            status: 400,
        })
    }
}
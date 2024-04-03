import dbConnect from "@/lib/mongo/dbConnect";
import PublishedCollection from "@/models/PublishedCollection";
import { NextRequest } from "next/server";

export async function GET(_request: NextRequest, { params }: { params: { collectionId: string } }) {

    try {
        dbConnect()
        const publishedCollection = await PublishedCollection.findById(params.collectionId)

        if (publishedCollection) {
            return Response.json(publishedCollection)
        }
        else {
            return new Response(JSON.stringify("Коллекция не найдена"), {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 404,
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
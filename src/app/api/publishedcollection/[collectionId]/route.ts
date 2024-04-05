import dbConnect from "@/lib/mongo/dbConnect";
import Collection from "@/models/Collection";
import PublishedCollection from "@/models/PublishedCollection";
import User from "@/models/User";
import { PublishedCollectionType } from "@/types/types";
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

export async function DELETE(_request: NextRequest, { params }: { params: { collectionId: string } }) {
    try {
        dbConnect()
        const publishedCollection: PublishedCollectionType | null = await PublishedCollection.findByIdAndDelete(params.collectionId)
        if (publishedCollection) {
            await Collection.findByIdAndUpdate(publishedCollection.originCollection, { $set: { publishedCollectionRef: null } })
            await User.findByIdAndUpdate(publishedCollection.authorId, { $pull: { publishedCollections: publishedCollection._id } })
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
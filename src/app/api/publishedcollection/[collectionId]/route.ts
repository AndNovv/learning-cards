import { validateAccessToken } from "@/lib/ValidateAccessToken";
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
            return new Response(JSON.stringify("Collection not found"), {
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
            status: 500,
        })
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { collectionId: string } }) {
    try {

        const result = await validateAccessToken(request)
        if (typeof result !== 'string') return result

        dbConnect()
        const publishedCollection: PublishedCollectionType | null = await PublishedCollection.findByIdAndDelete(params.collectionId)

        if (!publishedCollection) {
            return new Response(JSON.stringify("Collection not found"), {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 404,
            })
        }

        await Collection.findByIdAndUpdate(publishedCollection.originCollection, { $set: { publishedCollectionRef: null } })

        const user = await User.findById(publishedCollection.authorId)
        if (!user || user.email !== result) {
            return Response.json("User not found", {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 400,
            })
        }

        user.publishedCollections.pull(publishedCollection._id)
        user.save()
        // await User.findByIdAndUpdate(publishedCollection.authorId, { $pull: { publishedCollections: publishedCollection._id } })

        return new Response(JSON.stringify("Collection successfully deleted"), {
            headers: {
                "Content-Type": "application/json",
            },
            status: 200,
        })



    } catch (e) {
        return new Response(JSON.stringify(e), {
            headers: {
                "Content-Type": "application/json",
            },
            status: 500,
        })
    }
} 
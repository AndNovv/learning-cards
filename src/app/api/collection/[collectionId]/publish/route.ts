import { validateAccessToken } from "@/lib/ValidateAccessToken";
import dbConnect from "@/lib/mongo/dbConnect";
import Collection from "@/models/Collection";
import PublishedCollection from "@/models/PublishedCollection";
import User from "@/models/User";
import { FlashCardType, PublishedCollectionType } from "@/types/types";

import { NextRequest } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { collectionId: string } }) {

    try {

        const result = await validateAccessToken(request)
        if (typeof result !== 'string') return result

        await dbConnect()
        const collection = await Collection.findById(params.collectionId).populate('flashcards')

        if (!collection) {
            return Response.json("Collection not found", {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 400,
            })
        }

        const user = await User.findById(collection.authorId)

        if (!user || user.email !== result) {
            return Response.json("User does not have access to this Collection", {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 400,
            })
        }


        const flashcards = collection.flashcards.map((flashcard: FlashCardType) => ({ english: flashcard.english, russian: flashcard.russian }))
        const createdPublishedCollection: PublishedCollectionType | null = await PublishedCollection.create({ title: collection.title, authorId: collection.authorId, authorName: collection.author, flashcards, originCollection: params.collectionId })

        if (!createdPublishedCollection) {
            return Response.json("Publication error", {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 500,
            })
        }

        await Collection.findByIdAndUpdate(params.collectionId, { $set: { publishedCollectionRef: createdPublishedCollection._id } })
        await User.findByIdAndUpdate(collection.authorId, { $push: { publishedCollections: createdPublishedCollection._id } })

        return Response.json(createdPublishedCollection)

    } catch (e) {
        console.log(e)
        return Response.json(JSON.stringify(e))
    }
}
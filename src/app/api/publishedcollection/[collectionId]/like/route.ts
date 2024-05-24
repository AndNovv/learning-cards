import { validateAccessToken } from "@/lib/ValidateAccessToken";
import dbConnect from "@/lib/mongo/dbConnect";
import Collection from "@/models/Collection";
import Flashcard from "@/models/Flashcard";
import PublishedCollection from "@/models/PublishedCollection";
import User from "@/models/User";
import { FlashCardType, PublishedCollectionType, WordCollection } from "@/types/types";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { collectionId: string } }) {

    try {

        const result = await validateAccessToken(request)
        if (typeof result !== 'string') return result

        const { userId }: { userId: string } = await request.json()

        await dbConnect()

        const publishedCollection: PublishedCollectionType | null = await PublishedCollection.findByIdAndUpdate(params.collectionId, { $inc: { favouriteCount: 1 } })

        if (!publishedCollection) {
            return new Response(JSON.stringify("Collection not found"), {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 404,
            })
        }

        const user = await User.findById(userId)

        if (!user || user.email !== result) {
            return Response.json("Invalid User", {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 400,
            })
        }

        const requestFlashcards = publishedCollection.flashcards.map((flashcard) => ({ ...flashcard, repetitionTime: Date.now() }))
        const createdFlashcards: FlashCardType[] = await Flashcard.insertMany(requestFlashcards)
        const createdFlashcardsIds = createdFlashcards.map((flashcard) => flashcard._id)

        const addedCollection: WordCollection = await Collection.create({ title: publishedCollection.title, author: publishedCollection.authorName, authorId: userId, flashcards: createdFlashcardsIds, lastUpdateAt: new Date(), publishedCollectionRef: publishedCollection._id })

        const resultCollection = await Collection.findById(addedCollection._id).populate('flashcards')
        return Response.json(resultCollection)

    } catch (e) {
        return new Response(JSON.stringify(e), {
            headers: {
                "Content-Type": "application/json",
            },
            status: 500,
        })
    }
}
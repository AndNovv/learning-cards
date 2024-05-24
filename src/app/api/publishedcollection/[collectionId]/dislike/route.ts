import { validateAccessToken } from "@/lib/ValidateAccessToken";
import dbConnect from "@/lib/mongo/dbConnect";
import Collection from "@/models/Collection";
import Flashcard from "@/models/Flashcard";
import PublishedCollection from "@/models/PublishedCollection";
import User from "@/models/User";
import { PublishedCollectionType, WordCollection } from "@/types/types";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { collectionId: string } }) {

    try {

        const result = await validateAccessToken(request)
        if (typeof result !== 'string') return result

        const { userId }: { userId: string } = await request.json()

        await dbConnect()
        const publishedCollection: PublishedCollectionType | null = await PublishedCollection.findByIdAndUpdate(params.collectionId, { $inc: { favouriteCount: -1 } })

        if (!publishedCollection) {
            return Response.json("Коллекция не найдена")
        }

        const user = await User.findById(userId).populate('collections')

        if (!user || user.email !== result) {
            return Response.json("User not found", {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 400,
            })
        }

        const userCollections: WordCollection[] = user.collections

        for (let i = 0; i < userCollections.length; i++) {

            if (userCollections[i].publishedCollectionRef?.toString() == publishedCollection._id.toString()) {

                // Удаление нужной локальной коллекции и ее карточек
                const deletedCollection = await Collection.findByIdAndDelete(userCollections[i]._id)
                if (deletedCollection) {
                    await Flashcard.deleteMany({ _id: { $in: deletedCollection.flashcards } })
                    return Response.json(userCollections[i])
                }
            }
        }

        return new Response('Deletion Failed', {
            headers: {
                "Content-Type": "application/json",
            },
            status: 400,
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
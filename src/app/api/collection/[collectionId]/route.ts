import { validateAccessToken } from "@/lib/ValidateAccessToken";
import dbConnect from "@/lib/mongo/dbConnect";
import Collection, { ICollection } from "@/models/Collection";
import Flashcard from "@/models/Flashcard";
import PublishedCollection from "@/models/PublishedCollection";
import User from "@/models/User";
import { FlashCardType } from "@/types/types";
import { NextRequest } from "next/server";


// Edit collection
export async function PATCH(request: NextRequest, { params }: { params: { collectionId: string } }) {

    try {

        const result = await validateAccessToken(request)
        if (typeof result !== 'string') return result

        const { userId, newCards, deletedCards, updatedCards }: { userId: string, newCards: FlashCardType[], deletedCards: string[], updatedCards: FlashCardType[] } = await request.json()

        await dbConnect()

        const collection: ICollection | null = await Collection.findById(params.collectionId)

        if (!collection) {
            return Response.json("Colleciton not found", {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 400,
            })
        }

        const user = await User.findById(userId)

        if (!user || user.email !== result || String(collection.authorId) !== String(user._id)) {
            return Response.json("User does not have access to this collection", {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 400,
            })
        }


        // Добавление новый карт
        if (newCards.length > 0) {
            const newCardsPrepared = newCards.map(({ _id, ...flashcard }) => flashcard)
            const createdNewFlashCards: FlashCardType[] = await Flashcard.insertMany(newCardsPrepared)
            const flashcardsIds: string[] = createdNewFlashCards.map((flashcard) => flashcard._id)
            for (let i = 0; i < flashcardsIds.length; i++) {
                collection.flashcards.push(flashcardsIds[i])
            }
        }

        // Обновление старых карт
        if (updatedCards.length > 0) {
            await Flashcard.bulkWrite(updatedCards.map((flashcard) => ({
                updateOne: {
                    filter: { _id: flashcard._id },
                    update: flashcard
                }
            })))
        }

        // Удаление карт
        if (deletedCards.length > 0) {
            await Flashcard.deleteMany({ _id: { $in: deletedCards } })
            await Collection.updateOne({ _id: params.collectionId }, { $pull: { flashcards: { $in: deletedCards } } })
        }
        collection.lastUpdateAt = new Date()

        const updatedCollection = await collection.save()
        const resultCollection = await updatedCollection.populate('flashcards')
        return Response.json(resultCollection)

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


// Delete collection
export async function DELETE(request: NextRequest, { params }: { params: { collectionId: string } }) {
    try {

        const result = await validateAccessToken(request)
        if (typeof result !== 'string') return result

        await dbConnect()

        const collection: ICollection | null = await Collection.findById(params.collectionId)

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
            return Response.json("User does not have access to this collection", {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 400,
            })
        }

        await Collection.findByIdAndDelete(collection._id)

        if (collection.publishedCollectionRef) {
            await PublishedCollection.findByIdAndUpdate(collection.publishedCollectionRef, { $inc: { favouriteCount: -1 } })
        }

        await Flashcard.deleteMany({ _id: { $in: collection.flashcards } })
        return Response.json(collection)

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
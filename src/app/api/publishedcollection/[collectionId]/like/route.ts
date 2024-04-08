import dbConnect from "@/lib/mongo/dbConnect";
import Collection from "@/models/Collection";
import Flashcard from "@/models/Flashcard";
import PublishedCollection from "@/models/PublishedCollection";
import { FlashCardType, PublishedCollectionType, WordCollection } from "@/types/types";
import { NextRequest } from "next/server";

export async function POST(_request: NextRequest, { params }: { params: { collectionId: string } }) {

    try {
        await dbConnect()
        const publishedCollection: PublishedCollectionType | null = await PublishedCollection.findByIdAndUpdate(params.collectionId, { $inc: { favouriteCount: 1 } })

        if (publishedCollection) {
            const requestFlashcards = publishedCollection.flashcards.map((flashcard) => ({ ...flashcard, repetitionTime: Date.now() }))
            const createdFlashcards: FlashCardType[] = await Flashcard.insertMany(requestFlashcards)
            const createdFlashcardsIds = createdFlashcards.map((flashcard) => flashcard._id)

            const addedCollection: WordCollection = await Collection.create({ title: publishedCollection.title, author: publishedCollection.authorName, flashcards: createdFlashcardsIds, lastUpdateAt: new Date(), publishedCollectionRef: publishedCollection._id })

            const result = await Collection.findById(addedCollection._id).populate('flashcards')
            return Response.json(result)
        }
        else {
            return Response.json("Коллекция не найдена")
        }
    } catch (e) {
        return Response.json(e)
    }
}
import dbConnect from "@/lib/mongo/dbConnect";
import Collection, { ICollection } from "@/models/Collection";
import Flashcard from "@/models/Flashcard";
import { FlashCardType } from "@/types/types";
import { NextRequest } from "next/server";


// Edit collection
export async function PATCH(request: NextRequest, { params }: { params: { collectionId: string } }) {

    try {
        const { newCards, deletedCards, updatedCards }: { newCards: FlashCardType[], deletedCards: string[], updatedCards: FlashCardType[] } = await request.json()

        await dbConnect()

        const collection: ICollection | null = await Collection.findById(params.collectionId)

        if (collection) {

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
            const result = await updatedCollection.populate('flashcards')
            return Response.json(result)
        }
        else {
            console.log('Не удалось найти коллекцию')
        }
    }
    catch (e) {
        return Response.json(e)
    }
}


// Delete collection
export async function DELETE(_request: NextRequest, { params }: { params: { collectionId: string } }) {
    try {
        await dbConnect()
        const deletedCollection: ICollection | null = await Collection.findByIdAndDelete(params.collectionId)
        if (deletedCollection) {
            await Flashcard.deleteMany({ _id: { $in: deletedCollection.flashcards } })
            return Response.json(deletedCollection)
        }
        else {
            return Response.json("Данная коллекция не найдена")
        }
    }
    catch (e) {
        return Response.json(e)
    }
}
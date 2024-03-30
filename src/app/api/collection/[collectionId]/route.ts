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

        const collection: ICollection | null = await Collection.findById(params.collectionId).lean()

        if (collection) {

            // Добавление новый карт
            const newCardsPrepared = newCards.map(({ _id, ...flashcard }) => flashcard)
            const flashcardsIds: string[] = []
            newCardsPrepared.forEach(async (flashcard) => {
                const createdFlashcard: FlashCardType = await Flashcard.create(flashcard)
                flashcardsIds.push(createdFlashcard._id)
            })

            // Обновление старых карт
            updatedCards.forEach(async (flashcard) => {
                await Flashcard.updateOne({ _id: flashcard._id }, { $set: flashcard })
            })

            // Удаление карт
            await Flashcard.deleteMany({ _id: { $in: deletedCards } })

            await Collection.updateOne({ _id: params.collectionId }, { $pull: { flashcards: { $in: deletedCards } } })
            await Collection.updateOne({ _id: params.collectionId }, { $push: { flashcards: flashcardsIds } })


            const result = await Collection.findById(params.collectionId).populate('flashcards')

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
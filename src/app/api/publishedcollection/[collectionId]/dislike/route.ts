import dbConnect from "@/lib/mongo/dbConnect";
import Collection from "@/models/Collection";
import Flashcard from "@/models/Flashcard";
import PublishedCollection from "@/models/PublishedCollection";
import User from "@/models/User";
import { PublishedCOllectionType, WordCollection } from "@/types/types";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { collectionId: string } }) {

    try {
        const { userId }: { userId: string } = await request.json()

        await dbConnect()
        const publishedCollection: PublishedCOllectionType | null = await PublishedCollection.findByIdAndUpdate(params.collectionId, { $inc: { favouriteCount: -1 } })

        if (publishedCollection) {
            const user = await User.findById(userId).populate('collections')
            const userCollections: WordCollection[] = user.collections

            for (let i = 0; i < userCollections.length; i++) {


                if (userCollections[i].publishedCollectionRef?.toString() == publishedCollection._id.toString()) {

                    // Удаление нужной локальной 
                    const deletedCollection = await Collection.findByIdAndDelete(userCollections[i]._id)
                    if (deletedCollection) {
                        await Flashcard.deleteMany({ _id: { $in: deletedCollection.flashcards } })
                        return Response.json(userCollections[i])
                    }
                }
            }

            return Response.json("Что-то пошло не так")
        }
        else {
            return Response.json("Коллекция не найдена")
        }
    } catch (e) {
        return Response.json(e)
    }
}
import dbConnect from "@/lib/mongo/dbConnect";
import Flashcard from "@/models/Flashcard";
import { FlashCardType } from "@/types/types";
import { NextRequest } from "next/server";

export async function PATCH(request: NextRequest) {

    try {
        const { updatedCards }: { updatedCards: FlashCardType[] } = await request.json()

        await dbConnect()

        const res = await Flashcard.bulkWrite(updatedCards.map((flashcard) => ({
            updateOne: {
                filter: { _id: flashcard._id },
                update: flashcard
            }
        })))

        return Response.json(res)

    } catch (e) {
        return Response.json("Ошибка обновления карточек")
    }
}
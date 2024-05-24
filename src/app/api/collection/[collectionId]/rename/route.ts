import { validateAccessToken } from "@/lib/ValidateAccessToken";
import dbConnect from "@/lib/mongo/dbConnect";
import Collection, { ICollection } from "@/models/Collection";
import User from "@/models/User";
import { NextRequest } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: { collectionId: string } }) {

    try {

        const result = await validateAccessToken(request)
        if (typeof result !== 'string') return result

        const { collectionName }: { collectionName: string } = await request.json()

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
            return Response.json("User does not have access to this Collection", {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 400,
            })
        }

        collection.title = collectionName
        collection.save()
        return Response.json(collection)


    } catch (e) {
        return Response.json(e, {
            headers: {
                "Content-Type": "application/json",
            },
            status: 500,
        })
    }

} 
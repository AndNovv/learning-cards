import dbConnect from "@/lib/mongo/dbConnect";
import User, { IUser } from "@/models/User";
import Collection, { ICollection } from "@/models/Collection"
import { NextRequest } from "next/server";


// GET all User Data
export async function GET(_request: NextRequest, { params }: { params: { email: string } }) {
    try {
        await dbConnect()

        const user: IUser | null = await User.findOne({ email: params.email }).lean()

        if (user) {

            const collectionIds = user.collections
            const collections: ICollection[] = await Collection.find({ _id: { $in: collectionIds } }).lean()

            const result = { ...user, collections }
            return Response.json(result)

        }
        return Response.json("Пользователь не найден")
    }
    catch (e) {
        return new Response(JSON.stringify(e), {
            headers: {
                "Content-Type": "application/json",
            },
            status: 400,
        })
    }
}
import dbConnect from "@/lib/mongo/dbConnect";
import User from "@/models/User";
import { NextRequest } from "next/server";


// GET all User Data
export async function GET(_request: NextRequest, { params }: { params: { email: string } }) {
    try {
        await dbConnect()
        const user = await User.findOne({ email: params.email }).populate('collections').lean()
        if (user) {
            return Response.json(user)
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
import dbConnect from "@/lib/mongo/dbConnect";
import Lesson from "@/models/Lesson";
import { NextRequest } from "next/server";

export async function GET(_request: NextRequest, { params }: { params: { lessonId: string } }) {

    try {
        dbConnect()
        const lesson = await Lesson.findById(params.lessonId)

        if (!lesson) {
            return new Response(JSON.stringify("Lesson not found"), {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 404,
            })
        }

        return Response.json(lesson)

    } catch (e) {
        return new Response(JSON.stringify(e), {
            headers: {
                "Content-Type": "application/json",
            },
            status: 500,
        })
    }
}

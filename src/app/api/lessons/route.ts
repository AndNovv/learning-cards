import dbConnect from "@/lib/mongo/dbConnect";
import Lesson from "@/models/Lesson";

export async function GET() {

    try {
        await dbConnect()
        const lessonsResponse = await Lesson.find({}, '_id title description level').limit(20)
        if (lessonsResponse) {
            return Response.json(lessonsResponse)
        }
    }
    catch (e) {
        return new Response(JSON.stringify(e), {
            headers: {
                "Content-Type": "application/json",
            },
            status: 500,
        })
    }
}
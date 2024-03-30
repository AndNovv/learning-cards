import dbConnect from "@/lib/mongo/dbConnect";
import Collection from "@/models/Collection";


export async function GET() {

    try {
        await dbConnect()
        const collections = await Collection.find().populate('flashcards').lean()
        return Response.json(collections)
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
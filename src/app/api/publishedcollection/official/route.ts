import dbConnect from "@/lib/mongo/dbConnect";
import PublishedCollection from "@/models/PublishedCollection";


export async function GET() {

    try {
        await dbConnect()
        const publishedCollections = await PublishedCollection.find({ authorId: process.env.OFFICIAL_AUTHOR_ID }).limit(20)
        return Response.json(publishedCollections)
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
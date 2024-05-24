import dbConnect from "@/lib/mongo/dbConnect";
import PublishedCollection from "@/models/PublishedCollection";

// Retrieves a random sample of 10 Published Collection (currently is not used)
export async function GET() {

    try {
        await dbConnect()
        const publishedCollections = await PublishedCollection.aggregate([
            { $sample: { size: 10 } },
        ]);
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
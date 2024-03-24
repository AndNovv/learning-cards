import dbConnect from "@/lib/mongo/dbConnect";
import Collection from "@/models/Collection";


export async function GET() {

    try {
        await dbConnect()
        const collections = await Collection.find().lean()
        // const collections = resCollections.map((collection) => ({ ...collection, _id: JSON.stringify(collection._id) }))
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
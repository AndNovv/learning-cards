import dbConnect from "@/lib/mongo/dbConnect";
import Collection from "@/models/Collection";

export async function GET() {

    await dbConnect()
    const collections = (await Collection.find({})).map((collection) => ({ ...collection, _id: JSON.stringify(collection._id) }))
    return Response.json(collections)
}
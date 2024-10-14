import dbConnect from "@/lib/mongo/dbConnect";
import BlogPost from "@/models/BlogPost";
import PublishedCollection from "@/models/PublishedCollection";


export async function GET() {

    try {
        await dbConnect()
        const blogPosts = await BlogPost.find({}).limit(20)
        return Response.json(blogPosts)
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
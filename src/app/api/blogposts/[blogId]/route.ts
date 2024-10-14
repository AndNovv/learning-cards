import dbConnect from "@/lib/mongo/dbConnect"
import BlogPost from "@/models/BlogPost"
import { NextRequest } from "next/server"

export async function GET(_request: NextRequest, { params }: { params: { blogId: string } }) {

    try {
        dbConnect()
        const BlogPostData = await BlogPost.findById(params.blogId)

        if (BlogPostData) {
            return Response.json(BlogPostData)
        }
        else {
            return new Response(JSON.stringify("Collection not found"), {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 404,
            })
        }

    } catch (e) {
        return new Response(JSON.stringify(e), {
            headers: {
                "Content-Type": "application/json",
            },
            status: 500,
        })
    }
}
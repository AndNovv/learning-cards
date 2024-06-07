import fs from "fs"
import { NextRequest } from "next/server"

export async function GET(_request: NextRequest, { params }: { params: { slug: string[] } }) {

    if (params.slug && params.slug.length) {
        const publicDir = __dirname.split(".next")[0] + "public\\"
        const fileUrl = params.slug.join("\\")
        const data = fs.readFileSync(publicDir + fileUrl)
        if (!data) {
            return Response.json("Not Found", {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 404,
            })
        }
        return Response.json(data)
    } else {
        return Response.json("Not Found", {
            headers: {
                "Content-Type": "application/json",
            },
            status: 404,
        })
    }
}
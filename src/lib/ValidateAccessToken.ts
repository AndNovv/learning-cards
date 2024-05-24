import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt"

export const validateAccessToken = async (req: NextRequest) => {

    const secret = process.env.NEXTAUTH_SECRET
    const token = await getToken({ req, secret })

    if (token) {
        if (!token.email) {
            return Response.json("Invalid Access Token", {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 500,
            })
        }
        return token.email
    }


    return Response.json("No Access", {
        headers: {
            "Content-Type": "application/json",
        },
        status: 401,
    })


}
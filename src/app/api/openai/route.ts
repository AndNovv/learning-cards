import { NextRequest } from "next/server"
import OpenAI from "openai";
import dbConnect from "@/lib/mongo/dbConnect";
import User from "@/models/User";
import { validateAccessToken } from "@/lib/ValidateAccessToken";


export async function POST(request: NextRequest) {

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: "https://api.proxyapi.ru/openai/v1",
    });

    try {

        const result = await validateAccessToken(request)
        if (typeof result !== 'string') return result

        const { prompt, userId }: { prompt: string, userId: string } = await request.json()

        await dbConnect()
        const user = await User.findById(userId)

        if (!user || user.email !== result) {
            return Response.json("User not found", {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 400,
            })
        }

        if (!user.subscription) {
            if (user.freeAssistances <= 0) {
                return Response.json("Free Assistances are over", {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    status: 400,
                })
            }
            else {
                user.freeAssistances -= 1
                user.save()
            }
        }

        const response = await openai.chat.completions.create({
            messages: [
                { role: "user", content: prompt },
            ],
            model: "gpt-3.5-turbo-0125",
            max_tokens: 100
        });

        return Response.json(response.choices[0].message.content)
    }
    catch (e) {
        return Response.json(e, {
            headers: {
                "Content-Type": "application/json",
            },
            status: 500,
        })
    }

}

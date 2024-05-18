import { NextRequest } from "next/server"
import OpenAI from "openai";
import dbConnect from "@/lib/mongo/dbConnect";
import User from "@/models/User";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: "https://api.proxyapi.ru/openai/v1",
});

export async function POST(request: NextRequest) {

    try {

        const { prompt, userId }: { prompt: string, userId: string } = await request.json()
        await dbConnect()
        const user = await User.findById(userId)

        if (!user) {
            return Response.json("Пользователь не найден", {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 400,
            })
        }

        if (!user.subscription) {
            if (user.freeAssistances <= 0) {
                return Response.json("Бесплатные подсказки ассистента закончились", {
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
            status: 400,
        })
    }

}

import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user, account }: { user: any, account: any }) {
            const { name, email } = user

            if (account.provider === 'google') {
                try {
                    const res = await fetch("http://localhost:3000/api/user", {
                        cache: "no-store",
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ name, email })
                    })
                    if (res.ok) {
                        const newUser = await res.json()
                        return user
                    }
                }
                catch (e) {
                    console.log(e)
                }
            }
            return user
        }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
const axios = require('axios')

export async function GET() {

    try {
        axios.post()
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
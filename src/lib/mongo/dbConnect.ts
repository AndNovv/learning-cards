import mongoose from "mongoose";

const connecition: { isConnected?: number } = {}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Missing MONGODB_URI in environment variables');
}

console.log(MONGODB_URI)

async function dbConnect() {

    if (connecition.isConnected) {
        return
    }

    const db = await mongoose.connect(MONGODB_URI!)

    connecition.isConnected = db.connections[0].readyState
}

export default dbConnect
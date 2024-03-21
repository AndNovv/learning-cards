import mongoose from "mongoose";

const connecition: { isConnected?: number } = {}

async function dbConnect() {

    if (connecition.isConnected) {
        return
    }

    const db = await mongoose.connect(process.env.MONGODB_URI!)

    connecition.isConnected = db.connections[0].readyState
}

export default dbConnect
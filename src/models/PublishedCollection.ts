import mongoose, { Schema, Document } from "mongoose";


interface IPublishedFlashCard {
    english: string
    russian: string
}

// Define the interface for the collection document
export interface IPublishedCollection extends Document {
    title: string
    authorId: string
    authorName: string
    flashcards: IPublishedFlashCard[]
    favouriteCount: number
    publishedAt: Date
}

// Define the mongoose schema
export const PublishedCollectionSchema: Schema = new Schema({
    title: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    authorName: { type: String, required: true },
    flashcards: [{ type: Object, required: true, english: { type: String, required: true }, russian: { type: String, required: true } }],
    favouriteCount: { type: Number, required: true, min: 0, default: 0 },
    publishedAt: { type: Date, required: true, default: Date.now }
});

const PublishedCollection = mongoose.models.PublishedCollection || mongoose.model<IPublishedCollection>("PublishedCollection", PublishedCollectionSchema)

export default PublishedCollection
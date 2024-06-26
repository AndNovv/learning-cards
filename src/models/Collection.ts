import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the collection document
export interface ICollection extends Document {
    title: string;
    author: string;
    authorId: string;
    flashcards: string[]
    lastUpdateAt: Date
    publishedCollectionRef: string | null
}

// Define the mongoose schema
export const CollectionSchema: Schema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: 'User' },
    flashcards: [{ type: Schema.Types.ObjectId, ref: 'Flashcard' }],
    lastUpdateAt: { type: Date, required: true, default: Date.now },
    publishedCollectionRef: { type: Schema.Types.ObjectId, ref: 'PublishedCollection', default: null }
});

const Collection = mongoose.models.Collection || mongoose.model<ICollection>("Collection", CollectionSchema)

export default Collection
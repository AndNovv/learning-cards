import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the collection document
export interface ICollection extends Document {
    title: string;
    author: string;
    flashcards: string[];
    lastUpdateAt: Date
}

// Define the mongoose schema
export const CollectionSchema: Schema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    flashcards: [{ type: Schema.Types.ObjectId, ref: 'Flashcard' }],
    lastUpdateAt: { type: Date, required: true, default: Date.now }
});

const Collection = mongoose.models.Collection || mongoose.model<ICollection>("Collection", CollectionSchema)

export default Collection
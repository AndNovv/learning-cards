import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the collection document
export interface ICollection extends Document {
    title: string;
    author: string;
    flashcards: string[];
}

// Define the mongoose schema
export const CollectionSchema: Schema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    flashcards: [{ type: Schema.Types.ObjectId, ref: 'Flashcard' }],
});

const Collection = mongoose.models.Collection || mongoose.model<ICollection>("Collection", CollectionSchema)

export default Collection
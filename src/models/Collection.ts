import mongoose, { Schema, Document } from "mongoose";

interface IFlashcard {
    english: string
    russian: string
    repetition: number
    EF: number
    interval: number
    repetitionTime: number
}

// Define the interface for the collection document
export interface ICollection extends Document {
    title: string;
    author: string;
    flashcards: IFlashcard[];
}

// Define the mongoose schema
export const CollectionSchema: Schema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    flashcards: [{
        english: { type: String, required: true },
        russian: { type: String, required: true },
        repetition: { type: Number, required: true, default: 0 },
        EF: { type: Number, required: true, default: 2.5 },
        interval: { type: Number, required: true, default: 1 },
        repetitionTime: { type: Number, requred: true }
    }],
});

const Collection = mongoose.models.Collection || mongoose.model<ICollection>("Collection", CollectionSchema)

export default Collection
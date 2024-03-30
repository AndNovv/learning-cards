import mongoose, { Schema } from "mongoose";

export interface IFlashcard {
    english: string
    russian: string
    repetition: number
    EF: number
    interval: number
    repetitionTime: number
}

// Define the mongoose schema
export const FlashcardSchema: Schema = new Schema({
    english: { type: String, required: true },
    russian: { type: String, required: true },
    repetition: { type: Number, required: true, default: 0 },
    EF: { type: Number, required: true, default: 2.5 },
    interval: { type: Number, required: true, default: 1 },
    repetitionTime: { type: Number, requred: true }
});

const Flashcard = mongoose.models.Flashcard || mongoose.model<IFlashcard>("Flashcard", FlashcardSchema)

export default Flashcard

import mongoose, { Schema } from "mongoose";

interface Flashcard {
    english: string;
    russian: string;
}

// Define the interface for the collection document
interface ICollection extends Document {
    title: string;
    author: string;
    flashcards: Flashcard[];
}

// Define the mongoose schema
const CollectionSchema: Schema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    flashcards: [{
        english: { type: String, required: true },
        russian: { type: String, required: true }
    }]
});

const Collection = mongoose.models.Collection || mongoose.model<ICollection>("Collection", CollectionSchema)

export default Collection
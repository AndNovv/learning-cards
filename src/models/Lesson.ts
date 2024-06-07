import { FillBlankExerciseType, wordDefinitionExerciseType } from '@/types/types';
import mongoose, { Schema, Document } from 'mongoose';

// Define the schema for the lesson
export interface ILesson extends Document {
    title: string
    text: string
    audio: string
    wordDefinitionsExercise: wordDefinitionExerciseType
    fillBlankExercise: FillBlankExerciseType
}

export const LessonSchema: Schema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    audio: { type: String, required: true },
    wordDefinitionsExercise: [{ type: Object, required: true, word: { type: String, required: true }, definition: { type: String, required: true } }],
    fillBlankExercise: { type: Object, required: true, options: [{ type: String, required: true }], blankSentences: [{ type: Object, required: true, sentence: { type: String, required: true }, right: { type: String, required: true } }] },
});


const Lesson = mongoose.models.Lesson || mongoose.model<ILesson>("Lesson", LessonSchema);

export default Lesson;

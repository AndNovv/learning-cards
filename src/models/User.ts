import mongoose, { Schema, Document } from 'mongoose';

// Define the schema for the user
export interface IUser extends Document {
    name: string;
    email: string;
    subscription: boolean;
    freeAssistances: number;
    collections: string[] // Array of ObjectIds referencing Collections
    publishedCollections: string[]
}

export const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    subscription: { type: Boolean, required: true, default: false },
    freeAssistances: { type: Number, required: true, default: 10 },
    collections: [{ type: Schema.Types.ObjectId, ref: 'Collection' }], // Array of ObjectIds referencing Collections
    publishedCollections: [{ type: Schema.Types.ObjectId, ref: 'PublishedCollection' }] // Array of ObjectIds referencing PublishedCollections
});

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;

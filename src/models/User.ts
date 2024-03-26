import mongoose, { Schema, Document } from 'mongoose';

// Define the schema for the user
export interface IUser extends Document {
    name: string;
    email: string;
    collections: string[]; // Array of ObjectIds referencing Collections
}

export const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    collections: [{ type: Schema.Types.ObjectId, ref: 'Collection' }] // Array of ObjectIds referencing Collections
});

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;

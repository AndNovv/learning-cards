import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the BlogPost document
export interface IBlogPost extends Document {
    title: string
    content: string
    imageUrl: string
}

// Define the mongoose schema
export const BlogPostSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, required: true },
});

const BlogPost = mongoose.models.BlogPost || mongoose.model<IBlogPost>("BlogPost", BlogPostSchema)

export default BlogPost
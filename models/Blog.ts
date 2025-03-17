import mongoose, { Schema, model } from "mongoose";

// Blog Document Interface
type BlogDocument = {
  title: string;
  content: string;
  summary: string;
  imageUrl: string;
  authorId: mongoose.Types.ObjectId;
  readTime: number;
  createdAt?: Date;
  updatedAt?: Date;
};

// Blog Schema Definition
const BlogSchema = new Schema<BlogDocument>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    summary: { type: String, required: true },
    imageUrl: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    readTime: { type: Number, required: true },
  },
  { timestamps: true }
);

// Blog Model
const Blog = mongoose.models?.Blog || model<BlogDocument>("Blog", BlogSchema);
export default Blog;

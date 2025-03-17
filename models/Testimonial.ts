import mongoose, { Schema, model } from "mongoose";

// Testimonial Document
export interface TestimonialDocument {
  name: string;
  avatar: string;
  rating: number;
  review: string;
  packageName: string;
}

const TestimonialSchema = new Schema<TestimonialDocument>(
  {
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    rating: { type: Number, required: true },
    review: { type: String, required: true },
    packageName: { type: String, required: true },
  },
  { timestamps: true }
);

const Testimonial = mongoose.models?.Testimonial || model<TestimonialDocument>("Testimonial", TestimonialSchema);
export default Testimonial;
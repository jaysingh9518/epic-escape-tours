import mongoose, { Schema, model } from "mongoose";

// Package Document
export interface PackageDocument {
  title: string;
  description: string;
  location: string;
  duration: string;
  price: number;
  discountPrice?: number;
  imageUrl: string;
  rating: number;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PackageSchema = new Schema<PackageDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    imageUrl: { type: String, required: true },
    rating: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Package = mongoose.models?.Package || model<PackageDocument>("Package", PackageSchema);
export default Package;
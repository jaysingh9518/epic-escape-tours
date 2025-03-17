import mongoose, { Schema, model } from "mongoose";

// Destination Document
export interface DestinationDocument {
  name: string;
  country: string;
  imageUrl: string;
  popular: boolean;
}

const DestinationSchema = new Schema<DestinationDocument>(
  {
    name: { type: String, required: true },
    country: { type: String, required: true },
    imageUrl: { type: String, required: true },
    popular: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Destination = mongoose.models?.Destination || model<DestinationDocument>("Destination", DestinationSchema);
export default Destination;
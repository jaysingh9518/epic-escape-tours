import mongoose, { Schema, model } from "mongoose";

// Booking Document
export interface BookingDocument {
  userId: mongoose.Types.ObjectId;
  packageId: mongoose.Types.ObjectId;
  startDate: Date;
  numberOfTravelers: number;
  totalAmount: number;
  paymentStatus: string;
  paymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<BookingDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    packageId: { type: Schema.Types.ObjectId, ref: "Package", required: true },
    startDate: { type: Date, required: true },
    numberOfTravelers: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, default: "pending", required: true },
    paymentId: { type: String },
  },
  { timestamps: true }
);

const Booking = mongoose.models?.Booking || model<BookingDocument>("Booking", BookingSchema);
export default Booking;
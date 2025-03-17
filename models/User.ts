import mongoose, { Schema, model } from "mongoose";

// User Document
export interface UserDocument {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  imageUrl: string;
  phone?: string;
  email: string;
  role: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>(
  {
    clerkId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, default: "" },
    username: { type: String, required: false, unique: true }, // Optional for OAuth
    imageUrl: { type: String, required: true },
    phone: { type: String },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    role: { type: String, default: "user" },
    active: { type: Boolean, default: true }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models?.User || model<UserDocument>("User", UserSchema);
export default User;

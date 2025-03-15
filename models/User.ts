import mongoose, { Schema, model } from "mongoose";

export interface UserDocument {
  clerkId: string;
  firstname: string;
  lastname: string;
  imageUrl: string;
  username: string;
  email: string;  // Optional for OAuth
  phone?: string;
  admin: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>(
  {
    clerkId: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, default: "" },
    imageUrl: { type: String, required: true },
    username: { type: String, required: false, unique: true }, // Optional for OAuth
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    admin: { type: Boolean, default: false, required: true },
    active: { type: Boolean, default: true, required: true }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models?.User || model<UserDocument>("User", UserSchema);
export default User;

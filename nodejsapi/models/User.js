const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, default: ""},
  imageUrl: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  admin: { type: Boolean, default: false, required: true },
  active: { type: Boolean, default: false, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);

import { Schema, model } from "mongoose";
import { UserModel } from "../@types/types";

const userSchema = new Schema<UserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    google_id: { type: String },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

export default model<UserModel>("User", userSchema);

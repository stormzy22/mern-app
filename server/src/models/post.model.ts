import { Schema, model } from "mongoose";
import { PostModel } from "../@types/types";

const postSchema = new Schema<PostModel>({
  title: String,
  message: String,
  creator: String,
  name: String,
  tags: [String],
  selectedFile: String,
  likes: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model<PostModel>("post", postSchema);

import { Schema, model } from "mongoose";
import { PostModel } from "../@types/types";

const postSchema = new Schema<PostModel>(
  {
    title: String,
    message: String,
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    name: String,
    tags: [String],
    selectedFile: String,
    likes: { type: [String], default: [] },
    comments: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default model<PostModel>("Post", postSchema);

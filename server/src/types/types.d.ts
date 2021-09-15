import { Document } from "mongoose";

interface Post {
  _id: string;
  title: string;
  message: string;
  creator: string;
  tags: string[];
  likeCount: number;
  createdAt: Date | Date.now;
  updatedAt: Date | Date.now;
  selectedFile: string;
}

export interface UserModel extends Post, Document {}

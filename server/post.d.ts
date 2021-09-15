import { Document } from "mongoose";

interface Post {
  _id: string;
  title: string;
  message: string;
  creator: string;
  tags: string[];
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  selectedFile: string;
}

export interface UserModel extends Post, Document {}

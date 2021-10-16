import { Document } from "mongoose";

export interface PostModel extends Post, Document {
  _id: string;
  title: string;
  message: string;
  creator: { type };
  tags: string[];
  likeCount: number;
  likes: string[];
  createdAt: Date | Date.now;
  updatedAt: Date | Date.now;
  selectedFile: string;
  creator: string;
  name: string;
  comments: string[];
}

export interface UserModel extends User, Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date | Date.now;
  updatedAt: Date | Date.now;
  firstName: string;
  lastName: string;
  confirmPassword: string;
  google_id: string;
  imageUrl: string;
}

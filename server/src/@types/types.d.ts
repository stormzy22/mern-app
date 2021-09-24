import { Document } from "mongoose";

interface Post {
  _id: string;
  title: string;
  message: string;
  creator: string;
  tags: string[];
  likeCount: number;
  likes: string[];
  createdAt: Date | Date.now;
  updatedAt: Date | Date.now;
  selectedFile: string;
  creator: string;
  name: string;
}

interface User {
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
export interface PostModel extends Post, Document {}
export interface UserModel extends User, Document {}

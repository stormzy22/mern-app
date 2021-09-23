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

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date | Date.now;
  updatedAt: Date | Date.now;
  firstName: string;
  lastName: string;
  confirmpassword: string;
}
export interface PostModel extends Post, Document {}
export interface UserModel extends User, Document {}

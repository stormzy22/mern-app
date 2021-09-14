import PostMemories from "../models/post.model";
import { Request, Response, NextFunction } from "express";
import cloudinary from "cloudinary";
import { uploadImgToCloud } from "../helpers/upload.cloudinary";

export const getPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await PostMemories.find().sort({ createdAt: "desc" });
    res.status(200).json(posts);
  } catch (error: any) {
    res.status(404).json({ msg: error.message });
    console.log(error?.message);
  }
};

export const createPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, creator, message, tags, selectedFile } = req.body;
    const public_id = await uploadImgToCloud(selectedFile);
    const newPost = {
      title,
      creator,
      message,
      tags,
      selectedFile: public_id,
    };
    const new_post = await PostMemories.create(newPost);
    res.status(201).json(new_post);
  } catch (error: any) {
    res.status(409).send({ msg: error.message });
    console.log(error.message);
  }
};

export const updatePost = async (
  req: Request,
  res: Response
): Promise<unknown> => {
  try {
    const validId = await PostMemories.findById(req.params.id);
    if (!validId) {
      return res.status(404).send("No post with that id");
    }
    const checkFile = await cloudinary.v2.api.resource(req.body.selectedFile);
    console.log(checkFile);
    const updatedPost = await PostMemories.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.json(updatedPost);
  } catch (error: any) {
    res.status(404).send({ msg: error.message });
    console.log(error);
  }
};

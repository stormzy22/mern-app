import PostMemories from "../models/post.model";
import { Request, Response, NextFunction } from "express";
import cloudinary from "cloudinary";
import { uploadImgToCloud } from "../helpers/upload.cloudinary";
import { UserModel } from "../../post";

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
    const validPost = await PostMemories.findById(req.params.id);
    if (!validPost) {
      return res.status(404).send("No post with that id");
    }
    if (validPost.selectedFile !== req.body.selectedFile) {
      await cloudinary.v2.uploader.destroy(validPost.selectedFile);
      const public_id = await uploadImgToCloud(req.body.selectedFile);
      const updatedPost = await PostMemories.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body, selectedFile: public_id },
        { new: true }
      );
      return res.json(updatedPost);
    }
    const updatedPost = await PostMemories.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    );
    return res.json(updatedPost);
  } catch (error: any) {
    res.status(404).send({ msg: error.message });
    console.log(error);
  }
};

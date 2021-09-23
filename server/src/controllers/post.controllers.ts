import cloudinary from "cloudinary";
import { Request, Response } from "express";
import { uploadImgToCloud } from "../helpers/upload.cloudinary";
import PostMemories from "../models/post.model";
import mongoose from "mongoose";

//GET POST
export const getPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await PostMemories.find().sort({ createdAt: "desc" });
    res.status(200).json(posts);
  } catch (error: any) {
    res.status(404).json({ msg: error.message });
    console.log(error?.message);
  }
};
// CREATE POST
export const createPost = async (req: Request, res: Response): Promise<void> => {
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
// UPDATE POST
export const updatePost = async (req: Request, res: Response): Promise<unknown> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      throw new Error(`${req.params.id} is not a valid ID`);
    }
    const getFile = await PostMemories.findById(req.params.id);
    if (getFile) {
      if (getFile?.selectedFile !== req.body.selectedFile) {
        console.log(getFile.selectedFile);
        await cloudinary.v2.uploader.destroy(getFile?.selectedFile);
        const new_public_id = await uploadImgToCloud(req.body.selectedFile);
        await PostMemories.findByIdAndUpdate(req.params.id, { ...req.body, _id: req.body.id, selectedFile: new_public_id }, { new: true });
        const new_updatedPost = await PostMemories.find().sort({
          createdAt: "desc",
        });
        return res.json(new_updatedPost);
      }
    }
    await PostMemories.findByIdAndUpdate(req.params.id, { ...req.body, _id: req.body.id }, { new: true });
    const updatedPost = await PostMemories.find().sort({ createdAt: "desc" });

    res.json(updatedPost);
  } catch (error: any) {
    res.status(400).send({ msg: error?.message });
    console.log(error);
  }
};
// DELETE POST
export const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(`${id} is not a valid ID`);
    }
    const find_p_id = await PostMemories.findById(id);
    if (find_p_id) {
      await cloudinary.v2.uploader.destroy(find_p_id?.selectedFile);
    }
    await PostMemories.findByIdAndDelete(id);
    console.log("DELETED");

    res.json({ message: "Post deleted successfully." });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};
// LIKE POST
export const likePost = async (req: Request, res: Response): Promise<unknown> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(`${id} is not a valid ID`);
    }
    const post = await PostMemories.findById(id);
    if (post) {
      const updatedPost = await PostMemories.findByIdAndUpdate(id, {
        likeCount: post?.likeCount + 1,
      });
      const newUpdatedPost = await PostMemories.findOne({
        _id: updatedPost?._id,
      });
      return res.json(newUpdatedPost);
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

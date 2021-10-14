import cloudinary from "cloudinary";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { PostModel } from "../@types/types";
import { uploadImgToCloud } from "../helpers/upload.cloudinary";
import PostMemories from "../models/post.model";

type IQ = {
  searchQuery: string;
  tags: string;
};

//GET POST
export const getPost = async (req: Request, res: Response): Promise<void> => {
  const { page } = req.query;
  try {
    const LIMIT = 8,
      startIndex = (Number(page) - 1) * LIMIT,
      total = await PostMemories.countDocuments({});

    const posts = await PostMemories.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
    res.status(200).json({ data: posts, currentPage: page, numberOfPages: Math.ceil(total / LIMIT) });
  } catch (error: any) {
    res.status(404).json({ msg: error });
    console.log(error);
  }
};

//GET POST BY SEARCH
export const getPostBySearch = async (req: Request, res: Response): Promise<void> => {
  const { searchQuery, tags } = <IQ>req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const posts = await PostMemories.find({ $or: [{ title }, { tags: { $in: tags.split(",") } }] }).sort({ createdAt: "desc" });
    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ msg: error });
    console.log(error);
  }
};

// CREATE POST
export const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, creator, message, tags, selectedFile, name } = req.body;
    const public_id = await uploadImgToCloud(selectedFile);
    const newPost = { title, creator, message, tags, selectedFile: public_id, name };
    const new_post = await await PostMemories.create({ ...newPost, creator: req.userId });
    res.status(201).json(new_post);
  } catch (error: any) {
    res.status(409).send({ msg: error });
    console.log(error);
  }
};
// UPDATE POST
export const updatePost = async (req: Request, res: Response): Promise<unknown> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json(`${req.params.id} is not a valid ID`);
    const getFile = await PostMemories.findById(req.params.id);
    if (getFile) {
      if (getFile?.selectedFile !== req.body.selectedFile) {
        console.log(getFile.selectedFile);
        await cloudinary.v2.uploader.destroy(getFile?.selectedFile);
        const new_public_id = await uploadImgToCloud(req.body.selectedFile);
        await PostMemories.findByIdAndUpdate(req.params.id, { ...req.body, _id: req.body.id, selectedFile: new_public_id }, { new: true });
        const new_updatedPost = await PostMemories.find().sort({ createdAt: "desc" });
        return res.json(new_updatedPost);
      }
    }
    await PostMemories.findByIdAndUpdate(req.params.id, { ...req.body, _id: req.body.id }, { new: true });
    const updatedPost = await PostMemories.find().sort({ createdAt: "desc" });

    res.json(updatedPost);
  } catch (error: any) {
    res.status(400).send({ msg: error });
    console.log(error);
  }
};
// DELETE POST
export const deletePost = async (req: Request, res: Response): Promise<unknown> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: `${id} is not a valid id` });
    const find_p_id = await PostMemories.findById(id);
    if (find_p_id) await cloudinary.v2.uploader.destroy(find_p_id?.selectedFile);
    await PostMemories.findByIdAndDelete(id);
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
    if (!req.userId) return res.json({ message: "Unauthenticated" });
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: `${id} is not a valid id` });
    const post = (await PostMemories.findById(id)) as PostModel;
    const index = post.likes.findIndex((id) => id === String(req.userId));
    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMemories.findByIdAndUpdate(id, post, { new: true });
    const newUpdatedPost = await PostMemories.findOne({ _id: updatedPost?._id });
    return res.json(newUpdatedPost);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

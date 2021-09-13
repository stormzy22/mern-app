import PostMemories from "../models/post.model";
import clodinary from "cloudinary";
export const getPost = async (req, res) => {
  try {
    const posts = await PostMemories.find().sort({ createdAt: "desc" });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ msg: error.message });
    console.log(error.message);
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, creator, message, tags, selectedFile } = req.body;
    const { public_id } = await clodinary.v2.uploader.upload(selectedFile, {
      upload_preset: "memories_preset",
    });
    const newPost = {
      title,
      creator,
      message,
      tags,
      selectedFile: public_id,
    };
    const new_post = await PostMemories.create(newPost);
    res.status(201).json(new_post);
  } catch (error) {
    res.status(409).send({ msg: error.message });
    console.log(error.message);
  }
};

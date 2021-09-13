import PostMemories from "../models/post.model";
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
    const body = req.body;
    const new_post = await PostMemories.create(body);
    res.status(201).json(new_post);
  } catch (error) {
    res.status(409).send({ msg: error.message });
    console.log(error.message);
  }
};

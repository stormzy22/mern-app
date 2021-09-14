import axios from "axios";

export const fetchPost = () => axios.get("/");
export const createPost = (newPost) => axios.post("/", newPost);
export const updatePost = (id, updatedPost) => {
  axios.patch(`/${id}`, updatedPost);
};

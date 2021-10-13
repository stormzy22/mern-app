import axios from "axios";

export const fetchPost = () => axios.get("/");
export const fetchPostBySearch = (searchQuery) => axios.get(`/search?searchQuery=${searchQuery.search || "none"}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => axios.post("/", newPost);
export const updatePost = (id, updatedPost) => axios.patch(`/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`/${id}`);
export const likePost = (id) => axios.patch(`/${id}/likePost`);

export const signIn = (formData) => axios.post("/user/signin", formData);
export const signUp = (formData) => axios.post("/user/signup", formData);
export const googleAuth = (token) => axios.post("/user/google-o-auth", token);

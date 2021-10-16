import { Router } from "express";
import { createPost, deletePost, getPosts, likePost, updatePost, getPostBySearch, getPost, commentPost } from "../controllers/post.controllers";
import isAuth from "../middleware/auth.middleware";
const router = Router();

router.get("/search", getPostBySearch);
router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", isAuth, createPost);
router.patch("/:id", isAuth, updatePost);
router.delete("/:id", isAuth, deletePost);
router.patch("/:id/likePost", isAuth, likePost);
router.patch("/:id/commentPost", isAuth, commentPost);

export default router;

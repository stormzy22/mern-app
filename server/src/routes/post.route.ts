import { Router } from "express";
import { createPost, deletePost, getPost, likePost, updatePost, getPostBySearch } from "../controllers/post.controllers";
import isAuth from "../middleware/auth.middleware";
const router = Router();

router.get("/search", getPostBySearch);
router.get("/", getPost);
router.post("/", isAuth, createPost);
router.patch("/:id", isAuth, updatePost);
router.delete("/:id", isAuth, deletePost);
router.patch("/:id/likePost", isAuth, likePost);

export default router;

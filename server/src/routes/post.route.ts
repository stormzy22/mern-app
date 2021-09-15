import { Router } from "express";
import {
  createPost,
  deletePost,
  getPost,
  updatePost,
} from "../controllers/post.controllers";
const router = Router();

router.get("/", getPost);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;

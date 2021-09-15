import { Router } from "express";
import {
  createPost,
  getPost,
  updatePost,
} from "../controllers/post.controllers";
const router = Router();

router.get("/", getPost);
router.post("/", createPost);
router.patch("/:id", updatePost);

export default router;

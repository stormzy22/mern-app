import { Router } from "express";
import {
  createPost,
  getPost,
  updatePost,
} from "../controllers/post.controllers";
const router = Router();

router.patch("/:id", updatePost);
router.get("/", getPost);
router.post("/", createPost);

export default router;

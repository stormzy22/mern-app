"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controllers_1 = require("../controllers/post.controllers");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const router = (0, express_1.Router)();
router.get("/search", post_controllers_1.getPostBySearch);
router.get("/", post_controllers_1.getPosts);
router.get("/:id", post_controllers_1.getPost);
router.post("/", auth_middleware_1.default, post_controllers_1.createPost);
router.patch("/:id", auth_middleware_1.default, post_controllers_1.updatePost);
router.delete("/:id", auth_middleware_1.default, post_controllers_1.deletePost);
router.patch("/:id/likePost", auth_middleware_1.default, post_controllers_1.likePost);
exports.default = router;

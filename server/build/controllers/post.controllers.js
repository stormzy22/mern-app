"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likePost = exports.deletePost = exports.updatePost = exports.createPost = exports.getPost = exports.getPostBySearch = exports.getPosts = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const mongoose_1 = __importDefault(require("mongoose"));
const upload_cloudinary_1 = require("../helpers/upload.cloudinary");
const post_model_1 = __importDefault(require("../models/post.model"));
//GET POSTS
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page } = req.query;
    try {
        const LIMIT = 8, startIndex = (Number(page) - 1) * LIMIT, total = yield post_model_1.default.countDocuments({});
        const posts = yield post_model_1.default.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        res.status(200).json({ data: posts, currentPage: page, numberOfPages: Math.ceil(total / LIMIT) });
    }
    catch (error) {
        res.status(404).json({ msg: error });
        console.log(error);
    }
});
exports.getPosts = getPosts;
//GET POST BY SEARCH
const getPostBySearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchQuery, tags } = req.query;
    try {
        const title = new RegExp(searchQuery, "i");
        const posts = yield post_model_1.default.find({ $or: [{ title }, { tags: { $in: tags.split(",") } }] }).sort({ createdAt: "desc" });
        res.json({ data: posts });
    }
    catch (error) {
        res.status(404).json({ msg: error });
        console.log(error);
    }
});
exports.getPostBySearch = getPostBySearch;
//GET POST
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const post = yield post_model_1.default.findById(id);
        res.status(200).json(post);
    }
    catch (error) {
        res.status(404).json({ msg: error });
        console.log(error);
    }
});
exports.getPost = getPost;
// CREATE POST
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, creator, message, tags, selectedFile, name } = req.body;
        const public_id = yield (0, upload_cloudinary_1.uploadImgToCloud)(selectedFile);
        const newPost = { title, creator, message, tags, selectedFile: public_id, name };
        const new_post = yield yield post_model_1.default.create(Object.assign(Object.assign({}, newPost), { creator: req.userId }));
        res.status(201).json(new_post);
    }
    catch (error) {
        res.status(409).send({ msg: error });
        console.log(error);
    }
});
exports.createPost = createPost;
// UPDATE POST
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id))
            return res.status(400).json(`${req.params.id} is not a valid ID`);
        const getFile = yield post_model_1.default.findById(req.params.id);
        if (getFile) {
            if ((getFile === null || getFile === void 0 ? void 0 : getFile.selectedFile) !== req.body.selectedFile) {
                console.log(getFile.selectedFile);
                yield cloudinary_1.default.v2.uploader.destroy(getFile === null || getFile === void 0 ? void 0 : getFile.selectedFile);
                const new_public_id = yield (0, upload_cloudinary_1.uploadImgToCloud)(req.body.selectedFile);
                yield post_model_1.default.findByIdAndUpdate(req.params.id, Object.assign(Object.assign({}, req.body), { _id: req.body.id, selectedFile: new_public_id }), { new: true });
                const new_updatedPost = yield post_model_1.default.find().sort({ createdAt: "desc" });
                return res.json(new_updatedPost);
            }
        }
        yield post_model_1.default.findByIdAndUpdate(req.params.id, Object.assign(Object.assign({}, req.body), { _id: req.body.id }), { new: true });
        const updatedPost = yield post_model_1.default.find().sort({ createdAt: "desc" });
        res.json(updatedPost);
    }
    catch (error) {
        res.status(400).send({ msg: error });
        console.log(error);
    }
});
exports.updatePost = updatePost;
// DELETE POST
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id))
            return res.status(400).json({ message: `${id} is not a valid id` });
        const find_p_id = yield post_model_1.default.findById(id);
        if (find_p_id)
            yield cloudinary_1.default.v2.uploader.destroy(find_p_id === null || find_p_id === void 0 ? void 0 : find_p_id.selectedFile);
        yield post_model_1.default.findByIdAndDelete(id);
        res.json({ message: "Post deleted successfully." });
    }
    catch (error) {
        console.log(error);
        res.json(error);
    }
});
exports.deletePost = deletePost;
// LIKE POST
const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!req.userId)
            return res.json({ message: "Unauthenticated" });
        if (!mongoose_1.default.Types.ObjectId.isValid(id))
            return res.status(400).json({ message: `${id} is not a valid id` });
        const post = (yield post_model_1.default.findById(id));
        const index = post.likes.findIndex((id) => id === String(req.userId));
        if (index === -1) {
            post.likes.push(req.userId);
        }
        else {
            post.likes = post.likes.filter((id) => id !== String(req.userId));
        }
        const updatedPost = yield post_model_1.default.findByIdAndUpdate(id, post, { new: true });
        const newUpdatedPost = yield post_model_1.default.findOne({ _id: updatedPost === null || updatedPost === void 0 ? void 0 : updatedPost._id });
        return res.json(newUpdatedPost);
    }
    catch (error) {
        console.log(error);
        res.json(error);
    }
});
exports.likePost = likePost;

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
exports.likePost = exports.deletePost = exports.updatePost = exports.createPost = exports.getPost = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const upload_cloudinary_1 = require("../helpers/upload.cloudinary");
const post_model_1 = __importDefault(require("../models/post.model"));
const mongoose_1 = __importDefault(require("mongoose"));
//GET POST
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_model_1.default.find().sort({ createdAt: "desc" });
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(404).json({ msg: error.message });
        console.log(error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.getPost = getPost;
// CREATE POST
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, creator, message, tags, selectedFile } = req.body;
        console.log(req.body);
        const public_id = yield (0, upload_cloudinary_1.uploadImgToCloud)(selectedFile);
        const newPost = {
            title,
            creator,
            message,
            tags,
            selectedFile: public_id,
        };
        const new_post = yield post_model_1.default.create(newPost);
        res.status(201).json(new_post);
    }
    catch (error) {
        res.status(409).send({ msg: error.message });
        console.log(error.message);
    }
});
exports.createPost = createPost;
// UPDATE POST
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id)) {
            throw new Error(`${req.params.id} is not a valid ID`);
        }
        const getFile = yield post_model_1.default.findById(req.params.id);
        if (getFile) {
            if ((getFile === null || getFile === void 0 ? void 0 : getFile.selectedFile) !== req.body.selectedFile) {
                yield cloudinary_1.default.v2.uploader.destroy(getFile === null || getFile === void 0 ? void 0 : getFile.selectedFile);
                const new_public_id = yield (0, upload_cloudinary_1.uploadImgToCloud)(req.body.selectedFile);
                const new_updatedPost = yield post_model_1.default.findByIdAndUpdate(req.params.id, Object.assign(Object.assign({}, req.body), { _id: req.body.id, selectedFile: new_public_id }), { new: true });
                return res.json(new_updatedPost);
            }
        }
        const updatedPost = yield post_model_1.default.findByIdAndUpdate(req.params.id, Object.assign(Object.assign({}, req.body), { _id: req.body.id }), { new: true });
        res.json(updatedPost);
    }
    catch (error) {
        res.status(404).send({ msg: error.message });
        console.log(error);
    }
});
exports.updatePost = updatePost;
// DELETE POST
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            throw new Error(`${id} is not a valid ID`);
        }
        const find_p_id = yield post_model_1.default.findById(id);
        if (find_p_id) {
            yield cloudinary_1.default.v2.uploader.destroy(find_p_id === null || find_p_id === void 0 ? void 0 : find_p_id.selectedFile);
        }
        yield post_model_1.default.findByIdAndDelete(id);
        console.log("DELETED");
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
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            throw new Error(`${id} is not a valid ID`);
        }
        const post = yield post_model_1.default.findById(id);
        if (post) {
            const updatedPost = yield post_model_1.default.findByIdAndUpdate(id, {
                likeCount: (post === null || post === void 0 ? void 0 : post.likeCount) + 1,
            });
            const newUpdatedPost = yield post_model_1.default.findOne({
                _id: updatedPost === null || updatedPost === void 0 ? void 0 : updatedPost._id,
            });
            return res.json(newUpdatedPost);
        }
    }
    catch (error) {
        console.log(error);
        res.json(error);
    }
});
exports.likePost = likePost;

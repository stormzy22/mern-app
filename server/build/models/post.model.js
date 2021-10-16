"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    title: String,
    message: String,
    creator: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    name: String,
    tags: [String],
    selectedFile: String,
    likes: { type: [String], default: [] },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Post", postSchema);

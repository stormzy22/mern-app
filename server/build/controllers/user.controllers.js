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
exports.googleAuth = exports.signUp = exports.signIn = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const google_auth_library_1 = require("google-auth-library");
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const jwtSecrete = process.env.JWT_SECRETE || "test";
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, password } = req.body;
    try {
        const existing_user = yield user_model_1.default.findOne({ email });
        if (!existing_user)
            return res.status(404).json({ message: "User does't exist." });
        if (password.length < 1)
            return res.status(404).json({ message: "Password is required" });
        if (existing_user && ((_a = existing_user === null || existing_user === void 0 ? void 0 : existing_user.google_id) === null || _a === void 0 ? void 0 : _a.length) > 1)
            return res.status(404).json({ message: "Pls login with google" });
        const is_password_correct = yield bcryptjs_1.default.compare(password, existing_user.password);
        if (!is_password_correct)
            return res.status(400).json({ message: "Invalid Credentials" });
        const token = jsonwebtoken_1.default.sign({ email: existing_user.email, _id: existing_user._id }, jwtSecrete, { expiresIn: "1h" });
        res.status(200).json({ result: existing_user, token });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong 😃" });
        console.log(error);
    }
});
exports.signIn = signIn;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, password, confirmPassword, email } = req.body;
        const existing_user = yield user_model_1.default.findOne({ email });
        if (existing_user)
            return res.status(400).json({ message: "User already exist." });
        if (password !== confirmPassword)
            return res.status(400).json({ message: "Passwords don't match " });
        const hashed_password = yield bcryptjs_1.default.hash(password, 12);
        const new_user = yield user_model_1.default.create({ name: `${firstName} ${lastName}`, email, password: hashed_password });
        const token = jsonwebtoken_1.default.sign({ email: new_user.email, _id: new_user._id }, jwtSecrete, { expiresIn: "1h" });
        res.status(200).json({ result: new_user, token });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong 😃" });
        console.log(error);
    }
});
exports.signUp = signUp;
const googleAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { token_id, isSignUp } = req.body;
    try {
        if (!token_id)
            return res.status(400).json({ message: "Invalid token" });
        const ticket = yield client.verifyIdToken({ idToken: token_id, audience: process.env.GOOGLE_CLIENT_ID });
        const payload = ticket.getPayload();
        if (isSignUp) {
            const email_exist = yield user_model_1.default.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
            if (email_exist)
                return res.status(400).json({ message: "User already exist." });
            const create_user = { name: payload === null || payload === void 0 ? void 0 : payload.name, email: payload === null || payload === void 0 ? void 0 : payload.email, imageUrl: payload === null || payload === void 0 ? void 0 : payload.picture, google_id: payload === null || payload === void 0 ? void 0 : payload.sub };
            const google_user = yield user_model_1.default.create(create_user);
            const token = jsonwebtoken_1.default.sign({ email: google_user.email, _id: google_user._id }, jwtSecrete, { expiresIn: "1h" });
            res.status(200).json({ result: google_user, token });
        }
        else {
            const google_user = yield user_model_1.default.findOne({ google_id: payload === null || payload === void 0 ? void 0 : payload.sub });
            if (!google_user)
                return res.status(400).json({ message: "User not found." });
            if (google_user && ((_b = google_user === null || google_user === void 0 ? void 0 : google_user.google_id) === null || _b === void 0 ? void 0 : _b.length) < 1)
                return res.status(400).json({ message: "Not a google User" });
            const token = jsonwebtoken_1.default.sign({ email: google_user.email, _id: google_user._id }, jwtSecrete, { expiresIn: "1h" });
            res.status(200).json({ result: google_user, token });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong 😃" });
        console.log(error);
    }
});
exports.googleAuth = googleAuth;

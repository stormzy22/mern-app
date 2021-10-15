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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const cors_1 = __importDefault(require("cors"));
const connect_db_1 = require("./db/connect.db");
const post_route_1 = __importDefault(require("./routes/post.route"));
const users_route_1 = __importDefault(require("./routes/users.route"));
const app = (0, express_1.default)();
//config
dotenv_1.default.config();
cloudinary_1.default.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRETE,
});
const PORT = process.env.PORT || 5000;
//middleware
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use("/api/v3", post_route_1.default);
app.use("/api/v3/user", users_route_1.default);
//Start server
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connect_db_1.connectDB)();
        app.listen(PORT, () => {
            console.log(`Server started at port ${PORT}`);
        });
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
}))();

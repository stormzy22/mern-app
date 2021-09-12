import express from "express";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import { connectDB } from "./db/connect.db.js";

const app = express();

//config
dotenv.config();
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRETE,
});

const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server started at port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();

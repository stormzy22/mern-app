import express, { Application } from "express";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import cors from "cors";
import connectDB from "./db/connect.db";
import postRoute from "./routes/post.route";
import userRoute from "./routes/users.route";

const app: Application = express();

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
app.use(cors());

app.use("/api/v3", postRoute);
app.use("/api/v3/user", userRoute);

//Start server
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

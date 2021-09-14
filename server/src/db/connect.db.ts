import mongoose from "mongoose";

export const connectDB = async () => {
  const MONGO_URI = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@merncluster.mlgrw.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;
  try {
    const db = await mongoose.connect(MONGO_URI);
    console.log(`DB connected :: ${db.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

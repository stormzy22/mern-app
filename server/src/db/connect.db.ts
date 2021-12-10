import mongoose from "mongoose";

const connectDB = async (): Promise<void | typeof mongoose> => {
  const MONGO_URI = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@memoriesclusterv3.mlgrw.mongodb.net/${process.env.MONGO_DB_NAME}`;
  try {
    const db = await mongoose.connect(MONGO_URI);
    console.log(`DB connected at ${db.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;

import mongoose from "mongoose";

const options = {
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};

export const connectDB = async (): Promise<void | typeof mongoose> => {
  const MONGO_URI = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@merncluster.mlgrw.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;
  try {
    const db = await mongoose.connect(MONGO_URI, options);
    console.log(`DB connected at ${db.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

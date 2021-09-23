declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRETE: string;
      NODE_ENV?: "development" | "production";
      PORT: string;
      PWD?: string;
      MONGO_DB_NAME: string;
      MONGO_DB_USER: string;
      MONGO_DB_PASS: string;
      CLOUDINARY_NAME: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_API_SECRETE: string;
      GOOGLE_CLIENT_ID: string;
    }
  }
}

export {};

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../@types/types";

const jwtSecrete = process.env.JWT_SECRETE || "test";

const isAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    let decoded_data;
    if (token) {
      decoded_data = (await jwt.verify(token, jwtSecrete)) as UserModel;
      req.userId = decoded_data?._id;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default isAuth;

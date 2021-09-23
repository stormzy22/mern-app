import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../@types/types";
import User from "../models/user.model";
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const jwtSecrete = process.env.JWT_SECRETE || "test";

export const signIn = async (req: Request, res: Response): Promise<unknown> => {
  const { email, password }: UserModel = req.body;
  try {
    const existing_user = await User.findOne({ email });
    if (!existing_user) return res.status(404).json({ message: "User does't exist." });
    const is_password_correct = await bcrypt.compare(password, existing_user.password);
    if (!is_password_correct) return res.status(400).json({ message: "Invalid Credentials" });
    const token = jwt.sign({ email: existing_user.email, _id: existing_user._id }, jwtSecrete, { expiresIn: "1d" });
    res.status(200).json({ result: existing_user, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong 😃" });
    console.log(error);
  }
};

export const signUp = async (req: Request, res: Response): Promise<unknown> => {
  try {
    const { firstName, lastName, password, confirmPassword, email }: UserModel = req.body;
    const existing_user = await User.findOne({ email });
    if (existing_user) return res.status(400).json({ message: "User already exist." });
    if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match " });
    const hashed_password = await bcrypt.hash(password, 12);
    const new_user = await User.create({ name: `${firstName} ${lastName}`, email, password: hashed_password });
    const token = jwt.sign({ email: new_user.email, _id: new_user._id }, jwtSecrete, { expiresIn: "1d" });
    res.status(200).json({ result: new_user, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong 😃" });
    console.log(error);
  }
};

export const googleAuth = async (req: Request, res: Response): Promise<unknown> => {
  const { token_id } = req.body;
  try {
    if (!token_id) return res.status(400).json({ message: "Invalid token" });
    const ticket = await client.verifyIdToken({ idToken: token_id, audience: process.env.GOOGLE_CLIENT_ID });
    const payload = ticket.getPayload();
    const email_exist = await User.findOne({ email: payload?.email });
    if (email_exist) return res.status(400).json({ message: "User already exist." });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong 😃" });
    console.log(error);
  }
};

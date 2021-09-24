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
    if (password.length < 1) return res.status(404).json({ message: "Password is required" });
    if (existing_user && existing_user?.google_id?.length > 1) return res.status(404).json({ message: "Pls login with google" });
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
  const { token_id, isSignUp } = req.body;
  console.log(isSignUp);

  try {
    if (!token_id) return res.status(400).json({ message: "Invalid token" });
    const ticket = await client.verifyIdToken({ idToken: token_id, audience: process.env.GOOGLE_CLIENT_ID });
    const payload = ticket.getPayload();
    if (isSignUp) {
      const email_exist = await User.findOne({ email: payload?.email });
      if (email_exist) return res.status(400).json({ message: "User already exist." });
      const create_user = { name: payload?.name, email: payload?.email, imageUrl: payload?.picture, google_id: payload?.sub };
      const google_user = await User.create(create_user);
      const token = jwt.sign({ email: google_user.email, _id: google_user._id }, jwtSecrete, { expiresIn: "1d" });
      res.status(200).json({ result: google_user, token });
    } else {
      const google_user = await User.findOne({ google_id: payload?.sub });
      if (!google_user) return res.status(400).json({ message: "User not found." });
      if (google_user && google_user?.google_id?.length < 1) return res.status(400).json({ message: "Not a google User" });
      const token = jwt.sign({ email: google_user.email, _id: google_user._id }, jwtSecrete, { expiresIn: "1d" });
      res.status(200).json({ result: google_user, token });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong 😃" });
    console.log(error);
  }
};

// {
//   iss: 'accounts.google.com',
//   azp: '204955371376-0frlap23vs74lj6b7832udgvhv6hcp3d.apps.googleusercontent.com',
//   aud: '204955371376-0frlap23vs74lj6b7832udgvhv6hcp3d.apps.googleusercontent.com',
//   sub: '108691990694896136800',
//   email: 'aawweb23@gmail.com',
//   email_verified: true,
//   at_hash: '6iHyC5jugMjpy-Yd8JJc0Q',
//   name: 'Ww E',
//   picture: 'https://lh3.googleusercontent.com/a/AATXAJyksHKUtBR9rnuUpqySAROtwKV6HoxXXwqbSKY=s96-c',
//   given_name: 'Ww',
//   family_name: 'E',
//   locale: 'en',
//   iat: 1632474994,
//   exp: 1632478594,
//   jti: 'd2a8f22763e673d4886adc2138650b1fcc96f9eb'
// }

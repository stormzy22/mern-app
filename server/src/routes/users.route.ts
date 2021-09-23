import { Router } from "express";
import { googleAuth, signIn, signUp } from "../controllers/user.controllers";

const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/google-o-auth", googleAuth);

export default router;

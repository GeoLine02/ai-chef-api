import express from "express";
import { sendMessageController } from "../controllers/AIChat.controller";

const router = express.Router();

router.post("/generate-recipes", sendMessageController);

export default router;

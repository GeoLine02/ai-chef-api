import express from "express";
import { sendMessageController } from "../controllers/AIChat.controller";

const router = express.Router();

router.post("/send-message", sendMessageController);

export default router;

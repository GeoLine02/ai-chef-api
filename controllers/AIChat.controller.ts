import { Request, Response, NextFunction } from "express";
import { sendMessageService } from "../services/AIChat.service";

export const sendMessageController = async (req: Request, res: Response) => {
  try {
    await sendMessageService(req, res);
  } catch (error) {
    console.log(error);
  }
};

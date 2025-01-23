import { Request, Response } from "express";
import { CohereClientV2 } from "cohere-ai";

export const sendMessageService = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const cohere = new CohereClientV2({
      token: process.env.COHERE_API_KEY,
    });

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const response = await cohere.chat({
      model: "command-r-plus",
      messages: [
        {
          role: "user",
          content: `i have ${message}. don't say anything, just give me meal or drink recipe that can be served with these ingredients. result result must be array, where each recipe is object with entities. and also each recipe must have its category for sorting. salad, drinks, breakfast or lunch.`,
        },
      ],
    });

    const cohereResponse = response.message;

    return res.status(200).json({ message: cohereResponse });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

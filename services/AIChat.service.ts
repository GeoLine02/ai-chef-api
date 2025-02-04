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
          content: `i have ${message}. don't say anything, just give me meal or drink recipe that can be served with these ingredients. result must be array, where each recipe is object with entities. object  entity names must be identical for parsing it as JSON and also each recipe must have its category for sorting. salad, drinks, breakfast or lunch. also id and explained serving steps.
         

Instruction for Generating Correct Recipe JSON:
Structure of Recipe Data:
The format should be an array of objects, where each object represents a recipe. The structure for each recipe should include:

id (numeric identifier for the recipe)
name (the name of the recipe)
category (type of recipe, e.g., "Dessert", "Drink", "Beauty")
rating: (rating of product e.g., 4, 3, 5)
ingredients (an array of ingredients, each with a name and quantity)
steps (an array of instructions, each being a step in the recipe)
Ingredient Format:
Each ingredient should have two properties:

name (the name of the ingredient, e.g., "Sugar", "Butter")
quantity (the amount or measurement of the ingredient, e.g., "1 cup", "1 tablespoon")
No Typographical Errors:
Ensure all fields are correctly formatted, with no spelling mistakes or misplaced words. For example:

Use "name": "Butter" instead of "namepartum": "Butter"
Ensure there are no random words like "Bounding" between ingredient entries.
Valid JSON Syntax:

Ensure that the JSON format is correct (no stray commas or missing quotes).
Ingredients and steps should be structured as arrays, and each entry should be an object with name and quantity for ingredients.


[
  {
    "id": 1,
    "name": "Sugar Cookies",
    "category": "Dessert",
    "ingredients": [
      {
        "name": "Flour",
        "quantity": "2 3/4 cups"
      },
      {
        "name": "Sugar",
        "quantity": "1 cup"
      }
    ],
    "steps": [
      "Preheat oven to 350°F.",
      "Mix ingredients together."
    ]
  }
]
  all object keys must be same for example if one object has name key, every other object must have that key with same name.
each object must contain exact entities. if you can't generate it, just dont create object for that recipe at all.
response must always be the exact one that am provided in the example response dont add anything so it will be correct JSON format.
dont make any syntax error please.

please give me at least 5 recipes.

          `,
        },
      ],
    });

    const cohereResponse = response.message;

    return res.status(200).json(cohereResponse);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

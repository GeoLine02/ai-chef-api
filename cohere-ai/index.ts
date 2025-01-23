import { CohereClientV2 } from "cohere-ai";

const cohere = new CohereClientV2({
  token: process.env.COHERE_API_KEY,
});

(async () => {
  const response = await cohere.chat({
    model: "command-r-plus",
    messages: [
      {
        role: "user",
        content: "hello",
      },
    ],
  });
  console.log(response);
})();

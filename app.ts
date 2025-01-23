import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectToDatabase from "./sequelize";
import AIChatRoutes from "./routes/AIChat.routes";
import cors from "cors";
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

connectToDatabase();

app.use("/ai-chat", AIChatRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is up and running on port ${process.env.PORT}.`);
});

import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectToDatabase from "./sequelize";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

connectToDatabase();

app.get("/", (req: Request, res: Response) => {
  res.json({ info: "Node.js, Express, and Postgres API" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is up and running on port ${process.env.PORT}.`);
});

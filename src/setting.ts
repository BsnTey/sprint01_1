import express, { Request, Response } from "express";
import { videosRoute } from "./routes/videosRoute";
import bodyParser from "body-parser";
import { DataBase } from "./database/db";

export const app = express();

export const database = new DataBase();

app.use(bodyParser.json());

app.use("/videos", videosRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Hello</h1>");
});

app.delete("/testing/all-data", (req: Request, res: Response) => {
  database.clearDB();
  res.sendStatus(204);
});

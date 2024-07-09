import express, { Express, Request, Response , Application } from "express";
import dotenv from "dotenv";
import log from "./log/DevLogs";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Logger Template");
});

log.info("server started");

app.listen(port, () => {
  log.warn(`Server is running at http://localhost:${port}`);
});

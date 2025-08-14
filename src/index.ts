import express, { Request, Response } from "express";
import routes from "./routes/routes";
import cors from "cors";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(cors());

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

routes(app);
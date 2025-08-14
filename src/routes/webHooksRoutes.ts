import { Request, Response, Express } from "express";
import { WebHooksController } from "../controllers/WebHooksController";

const webHooksController = new WebHooksController();

const webHooksRoutes = (app: Express): void => {
  app.post("/webhook/transaction", (req: Request, res: Response): void => {
    webHooksController.hookTransaction(req, res);
  });

  app.post("/webhook/transfer", (req: Request, res: Response): void => {
    webHooksController.hookTransfer(req, res);
  });
};

export default webHooksRoutes;

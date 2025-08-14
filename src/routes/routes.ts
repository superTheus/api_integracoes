import { Express } from "express";
import webHooksRoutes from "./webHooksRoutes";

const routes = (app: Express) => {
  webHooksRoutes(app);
};

export default routes;
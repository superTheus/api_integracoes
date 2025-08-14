import { Request, Response } from "express";

export class TransferController {
  async hookTransaction(req: Request, res: Response) {
    const dataTransaction = req.body;
    console.log(dataTransaction);
    res.status(200).send("Webhook received");
  }
}

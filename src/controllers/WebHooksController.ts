import { Request, Response } from "express";
import { sendEmail } from "../services/email.service";
import dotenv from "dotenv";

dotenv.config();

export class WebHooksController {
  async hookTransaction(req: Request, res: Response) {
    try {
      await sendEmail({
        email: process.env.EMAIL_DESTINATION || "",
        subject: "Webhook de Transação Recebido",
        jsonData: req.body
      })
      res.status(200).send("Webhook received");
    } catch(error) {
      res.status(500).send("Internal Server Error");
    }
  }

  async hookTransfer(req: Request, res: Response) {
    try {
      await sendEmail({
        email: process.env.EMAIL_DESTINATION || "",
        subject: "Webhook de Transferência Recebido",
        jsonData: req.body
      })
      res.status(200).send("Webhook received");
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  }

  async hookTransferValidation(req: Request, res: Response) {
    try {
      await sendEmail({
        email: process.env.EMAIL_DESTINATION || "",
        subject: "Webhook de Validação de Transferência Recebido",
        jsonData: req.body
      })

      res.json({ status: "APPROVED" });
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  }

  async hookPaymentSplit(req: Request, res: Response) {
    try {
      await sendEmail({
        email: process.env.EMAIL_DESTINATION || "",
        subject: "Webhook de Split de Pagamento Recebido",
        jsonData: req.body
      })

      res.json({ status: "APPROVED" });
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  }
}

import { Request, Response } from "express";
import { sendEmail } from "../services/email.service";
import dotenv from "dotenv";
import { ApiService, Hook } from "../services/apis.service";

dotenv.config();

export class WebHooksController {
  private readonly apiInstance: ApiService;

  constructor() {
    this.apiInstance = new ApiService();
  }

  async hookTransaction(req: Request, res: Response) {
    try {
      const hookData: Hook = {
        tipo: "TS",
        titulo: "Transação Recebida",
        conteudo: JSON.stringify(req.body)
      };

      await Promise.all([
        this.apiInstance.create(hookData),
        sendEmail({
          email: process.env.EMAIL_DESTINATION || "",
          subject: "Webhook de Transação Recebida",
          jsonData: req.body
        })
      ])

      res.status(200).send("Webhook received");
    } catch(error) {
      res.status(500).send("Internal Server Error");
    }
  }

  async hookTransfer(req: Request, res: Response) {
    try {
      const hookData: Hook = {
        tipo: "TF",
        titulo: "Transferência Recebida",
        conteudo: JSON.stringify(req.body)
      };

      await Promise.all([
        this.apiInstance.create(hookData),
        sendEmail({
          email: process.env.EMAIL_DESTINATION || "",
          subject: "Webhook de Transferência Recebida",
          jsonData: req.body
        })
      ])

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

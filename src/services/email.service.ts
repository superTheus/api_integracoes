import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD_EMAIL,
  },
});

/**
 * Função para enviar um JSON por e-mail
 * @param email - E-mail do destinatário
 * @param jsonData - Objeto JSON a ser enviado
 */
export const sendEmail = async (email: string, jsonData: object) => {
  try {
    // Template do e-mail com JSON formatado
    const emailTemplate = `
      <div style="font-family: Arial, sans-serif; background-color: #e4e4e4; padding: 20px;">
        <h1 style="color: #dd5c00; font-weight: bold">JSON Recebido</h1>
        <p style="color: #18181B;">Segue o JSON recebido:</p>
        <pre style="background: #fff; padding: 15px; border-radius: 8px; color: #333; font-size: 14px;">${JSON.stringify(jsonData, null, 2)}</pre>
      </div>
    `;

    // Opções do e-mail
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "JSON de retorno ASAAS",
      html: emailTemplate,
    };
    // Enviar e-mail
    await transporter.sendMail(mailOptions);
    console.log(`✅ JSON enviado para ${email}`);
  } catch (error) {
    console.error("❌ Erro ao enviar e-mail:", error);
    throw new Error("Erro ao enviar e-mail");
  }
};

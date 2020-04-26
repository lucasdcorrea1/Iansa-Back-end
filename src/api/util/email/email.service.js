import sendGridMail from "@sendgrid/mail";

import Env from "../../config/environment";
import EMAIL_MESSAGE_TYPES from "./email.types";

class EmailService {
  static async sendMail(to, emailType, name, link) {
    const email = await this.getEmailContext(emailType, name, link);

    sendGridMail.setApiKey(Env.sendgrid_api_key);
    const msg = {
      to,
      from: Env.sendgrid_sender_email,
      subject: email.subject,
      text: email.text,
      html: email.html
    };
    await sendGridMail.send(msg);
  }

  static async getEmailContext(emailType, name, link) {
    let subject;
    let text;
    let html;
    switch (emailType) {
      case EMAIL_MESSAGE_TYPES.CONTACT:
        subject = "Obrigado por enviar sua mensagem!";
        text = "Nós recebemos sua mensagem, muito obrigado pelo contato.";
        html = "<strong>and easy to do anywhere, even with Node.js</strong>";
        break;
      case EMAIL_MESSAGE_TYPES.RESET_PASSWORD:
        subject = `Ei, ${name}, você precisa alterar sua senha?`;
        text = `Para alterar sua senha acesse o link: ${link} `;
        html = "<strong>and easy to do anywhere, even with Node.js</strong>";
        break;
      case EMAIL_MESSAGE_TYPES.SUBSCRIBER:
        subject = "Obrigado por enviar sua mensagem!";
        text = "Nós recebemos sua mensagem, muito obrigado pelo contato.";
        html = "<strong>and easy to do anywhere, even with Node.js</strong>";
        break;
      case EMAIL_MESSAGE_TYPES.VERIFY_EMAIL:
        subject = `Olá ${name}, por favor confirme seu email!`;
        text = `Para alterar sua senha acesse o link: ${link} `;
        html = "<strong>and easy to do anywhere, even with Node.js</strong>";
        break;

      default:
        break;
    }
    return { subject, text, html };
  }
}

export default EmailService;

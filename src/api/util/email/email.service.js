import fs from "fs";

import sendGridMail from "@sendgrid/mail";

import Env from "../../config/environment";
import EMAIL_MESSAGE_TYPES from "./email.types";

class EmailService {
  static async sendMail(to, emailType, name, link) {
    const email = await this.getEmailContext(emailType, name, link);

    sendGridMail.setApiKey(Env.sendgrid.api_key);
    const msg = {
      to,
      from: Env.sendgrid.sender_email,
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
        subject = "Obrigado por nos enviar sua mensagem!";
        html = fs
          .readFileSync(
            `${Env.api.root}/api/util/email/resources/htmls/contact.html`
          )
          .toString()
          .replace("{{name}}", name);
        break;
      case EMAIL_MESSAGE_TYPES.SUBSCRIPTION:
        subject = "Obrigado por se inscrever!";
        html = fs
          .readFileSync(
            `${Env.api.root}/api/util/email/resources/htmls/subscription.html`
          )
          .toString()
          .replace("{{name}}", name);
        break;
      case EMAIL_MESSAGE_TYPES.VERIFY_EMAIL:
        subject = `Olá ${name}, por favor confirme seu email!`;
        html = fs
          .readFileSync(
            `${Env.api.root}/api/util/email/resources/htmls/subscription.html`
          )
          .toString()
          .replace("{{name}}", name)
          .replace("{{link}}", link);
        break;
      case EMAIL_MESSAGE_TYPES.FORGOT_PASSWORD:
        subject = `Ei, ${name}, você precisa alterar sua senha?`;
        html = fs
          .readFileSync(
            `${Env.api.root}/api/util/email/resources/htmls/forgotPassword.html`
          )
          .toString()
          .replace("{{name}}", name)
          .replace("{{link}}", link);
        break;
      default:
        throw new Error();
    }
    return { subject, text, html };
  }
}

export default EmailService;

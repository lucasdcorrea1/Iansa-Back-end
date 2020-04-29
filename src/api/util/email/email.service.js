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
      case EMAIL_MESSAGE_TYPES.MESSAGE:
        subject = "Obrigado pela mensagem!";
        html = fs
          .readFileSync(`${Env.api.root}/api/util/email/html/message.html`)
          .toString()
          .replace("{{NAME}}", name);
        break;
      case EMAIL_MESSAGE_TYPES.VERIFY_EMAIL:
        subject = `Olá ${name}, por favor confirme seu email!`;
        html = fs
          .readFileSync(`${Env.api.root}/api/util/email/html/verifyEmail.html`)
          .toString()
          .replace("{{NAME}}", name)
          .split("{{LINK}}")
          .join(link);
        break;
      case EMAIL_MESSAGE_TYPES.FORGOT_PASSWORD:
        subject = `Ei ${name}, precisa alterar sua senha?`;
        html = fs
          .readFileSync(
            `${Env.api.root}/api/util/email/html/forgotPassword.html`
          )
          .toString()
          .replace("{{NAME}}", name)
          .split("{{LINK}}")
          .join(link);
        break;
      default:
        throw new Error();
    }
    return { subject, text, html };
  }
}

export default EmailService;

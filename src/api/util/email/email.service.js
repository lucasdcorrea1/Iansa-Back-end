import fs from 'fs';

import sendGridMail from '@sendgrid/mail';

import env from '../../config/environment';
import EMAIL_MESSAGE_TYPES from './email.types';

class EmailService {
  static async sendMail(to, emailType, name, link) {
    const email = await this.getEmailContext(emailType, name, link, to);

    sendGridMail.setApiKey(env.sendgrid.api_key);
    const msg = {
      to,
      from: env.sendgrid.sender_email,
      subject: email.subject,
      text: email.text,
      html: email.html
    };
    await sendGridMail.send(msg);
  }

  static async getEmailContext(emailType, name, link, email) {
    let subject;
    let text;
    let html;
    switch (emailType) {
      case EMAIL_MESSAGE_TYPES.MESSAGE:
        subject = 'Obrigado pela mensagem!';
        html = fs
          .readFileSync(`${env.api.root}/api/util/email/html/message.html`)
          .toString()
          .replace('{{NAME}}', name);
        break;
      case EMAIL_MESSAGE_TYPES.VERIFY_EMAIL:
        subject = `Olá ${name}, por favor confirme seu email!`;
        html = fs
          .readFileSync(`${env.api.root}/api/util/email/html/verifyEmail.html`)
          .toString()
          .replace('{{NAME}}', name)
          .split('{{LINK}}')
          .join(link);
        break;
      case EMAIL_MESSAGE_TYPES.FORGOT_PASSWORD:
        subject = `Ei ${name}, precisa alterar sua senha?`;
        html = fs
          .readFileSync(
            `${env.api.root}/api/util/email/html/forgotPassword.html`
          )
          .toString()
          .replace('{{NAME}}', name)
          .split('{{LINK}}')
          .join(link);
        break;
      case EMAIL_MESSAGE_TYPES.SUBSCRIBER:
        subject = `Olá, bem vindo ao IANSA!`;
        html = fs
          .readFileSync(`${env.api.root}/api/util/email/html/subscriber.html`)
          .toString()
          .replace('{{EMAIL}}', email)
          .split('{{LINK}}')
          .join(link);
        break;
      case EMAIL_MESSAGE_TYPES.VOLUNTARY:
        subject = `Olá, obrigado por se voluntariar ao IANSA!`;
        html = fs
          .readFileSync(`${env.api.root}/api/util/email/html/voluntary.html`)
          .toString()
          .split('{{LINK}}')
          .join(name)
          .split('{{EMAIL}}')
          .join(email)
          .split('{{NAME}}')
          .join(name);
        break;
      default:
        throw new Error(`Type ${emailType}  not implemented`);
    }
    return { subject, text, html };
  }
}

export default EmailService;

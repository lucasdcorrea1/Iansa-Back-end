import fs from 'fs';

import env from '../../config/environment';
import emailMessageTypes from './email.types';

class EmailBusiness {
  static async getEmailContext(emailType, name, link, email) {
    let subject;
    let text;
    let html;
    switch (emailType) {
      case emailMessageTypes.MESSAGE:
        subject = 'Obrigado pela mensagem!';
        html = fs
          .readFileSync(`${env.api.root}/api/services/email/html/message.html`)
          .toString()
          .replace('{{NAME}}', name);
        break;
      case emailMessageTypes.SUBSCRIBER:
        subject = `Olá, bem vindo ao IANSA!`;
        html = fs
          .readFileSync(
            `${env.api.root}/api/services/email/html/subscriber.html`
          )
          .toString()
          .replace('{{EMAIL}}', email)
          .split('{{LINK}}')
          .join(link);
        break;
      case emailMessageTypes.VERIFY_EMAIL:
        subject = `Olá ${name}, por favor confirme seu email!`;
        html = fs
          .readFileSync(
            `${env.api.root}/api/services/email/html/verifyEmail.html`
          )
          .toString()
          .replace('{{NAME}}', name)
          .split('{{LINK}}')
          .join(link);
        break;
      case emailMessageTypes.FORGOT_PASSWORD:
        subject = `Ei ${name}, precisa alterar sua senha?`;
        html = fs
          .readFileSync(
            `${env.api.root}/api/services/email/html/forgotPassword.html`
          )
          .toString()
          .replace('{{NAME}}', name)
          .split('{{LINK}}')
          .join(link);
        break;
      case emailMessageTypes.VOLUNTARY:
        subject = `Obrigado por se voluntariar ao IANSA!`;
        html = fs
          .readFileSync(
            `${env.api.root}/api/services/email/html/voluntary.html`
          )
          .toString()
          .split('{{LINK}}')
          .join(link)
          .split('{{NAME}}')
          .join(name);
        break;
      default:
        throw new Error(`Type ${emailType}  not implemented`);
    }
    return { subject, text, html };
  }
}

export default EmailBusiness;

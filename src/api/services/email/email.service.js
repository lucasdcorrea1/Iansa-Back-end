import sendGridMail from '@sendgrid/mail';

import emailBusiness from './email.business';
import env from '../../config/environment';

class EmailService {
  static async sendMail(to, emailType, name, link) {
    const email = await emailBusiness.getEmailContext(
      emailType,
      name,
      link,
      to
    );

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
}

export default EmailService;

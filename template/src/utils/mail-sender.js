import nodeMailer from 'nodemailer';
import BaseConfig from '../config/base-config';

class MailConfig extends BaseConfig {
  constructor() {
    super();
  }

  sendEmail(email, subject, text) {
    const transporter = nodeMailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: subject,
      attachDataUrls: true,
      html: text,
    };

    try {
      const info = transporter.sendMail(mailOptions);
      console.log('Mail sent:', info);
      return 'mailSent';
    } catch (err) {
      console.error('Mail sending error:', err.message);
      return err.message;
    }
  }
}

export default new MailConfig();

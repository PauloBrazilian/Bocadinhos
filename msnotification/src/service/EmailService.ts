import nodemailer from 'nodemailer';
import { EmailShema } from '../shema/EmailShema';

class EmailService {
    
    private transporter;
  
    constructor() {      
      this.transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    }
  
  async sendEmail(data: {
    fromEmail: string;
    fromName: string;
    replyTo: string;
    subject: string;
    body: string;
    img?: string;
  }) {
    const validatedData = EmailShema.parse(data);

    const info = await this.transporter.sendMail({
      from: `${validatedData.fromName} <${validatedData.fromEmail}>`,
      to: validatedData.replyTo,
      subject: validatedData.subject,
      text: validatedData.body,
      attachments: validatedData.img ? [{ path: validatedData.img }] : [],
    });

    console.log('Message sent: %s', info.messageId);
  }
}

export const emailService = new EmailService();
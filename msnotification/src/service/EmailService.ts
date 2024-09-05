import { DataSource } from 'typeorm';
import { EmailRepository } from '../repository/EmailRepository';
import nodemailer from 'nodemailer';
import { EmailShema } from '../shema/EmailShema';
import KafkaProducer from '../queue/KafkaProducer';
import path from 'path';

class EmailService {
    
  private transporter;
  private emailRepository: EmailRepository;

  constructor(dataSource: DataSource) {
      this.emailRepository = new EmailRepository(dataSource);
      this.transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST!,
          port: Number(process.env.EMAIL_PORT),
          secure: false,
          auth: {
              user: process.env.EMAIL_USER!,
              pass: process.env.EMAIL_PASS!,
          },
      });

      KafkaProducer.connect().catch(console.error);        
  }

  async sendEmail(object: any) {
      const validatedData = EmailShema.parse(object);

      await this.emailRepository.save({
          fromEmail: validatedData.fromEmail,
          fromName: validatedData.fromName,
          replyTo: validatedData.replyTo,
          subject: validatedData.subject,
          body: validatedData.body,
          statusEmail: 'SEND',
          img: path.resolve(__dirname, '../../templates/Welcome.jpg'),
      });

      const info = await this.transporter.sendMail({
          from: `${validatedData.fromName} <${validatedData.fromEmail}>`,
          to: validatedData.replyTo,
          subject: validatedData.subject,
          text: validatedData.body,
          attachments: [
              {
                  filename: 'Welcome.jpg',
                  path: path.resolve(__dirname, '../../templates/Welcome.jpg'),
                  cid: 'Welcome'
              }
          ]
      });
    
      const infoMessage = JSON.stringify(info);
      await KafkaProducer.sendMessage(
          'send-email',
          infoMessage
      );

      return 'Email message sent to Kafka and email saved to database';
  }
}

export default EmailService;
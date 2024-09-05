import { Request, Response } from "express";
import { z } from "zod";
import EmailService from "../service/EmailService";
import { DataSource } from "typeorm";

export default class EmailController {
    
    private emailService: EmailService;

    constructor(dataSource: DataSource) {
        this.emailService = new EmailService(dataSource);
    }

    async sendEmail(req: Request, res: Response): Promise<Response> {
        try {
          await this.emailService.sendEmail(req.body);
          return res.status(200).json({
            message: 'Send email with Successuly!',
          });
        } catch (error) {
          if (error instanceof z.ZodError) {
            return res.status(400).json({
              message: 'Validation data error',
              errors: error.errors,
            });
          }
          console.error('Error to send email:', error);
          return res.status(500).json({
            message: 'Internal server error',
          });
        }
      }
}
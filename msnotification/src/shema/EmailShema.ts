import { z } from "zod";

export const EmailShema = z.object({
    
    fromEmail: z.string().email(),
    fromName: z.string(),
    replyTo: z.string().email(),
    subject: z.string(),   
    body: z.string(),
    
});
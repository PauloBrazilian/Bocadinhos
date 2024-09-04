import { z } from 'zod';


const personSchema = z.object({
    id: z.number(),
    name: z.string(),
    imgurl: z.string().url(),
    cpf: z.string().min(11).max(11),
    email: z.string().email(),
    password: z.string(),
    roles: z.array(z.string()),
});

const adminSchema = z.object({
    id: z.number(),
    name: z.string(),
    imgurl: z.string().url(),
    email: z.string().email(),
    password: z.string(),
    roles: z.array(z.string())
})
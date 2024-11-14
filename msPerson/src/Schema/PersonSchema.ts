import { z } from 'zod';


const personSchema = z.object({
    name: z.string(),
    imgurl: z.string().url({ message: "url inválido"}),
    cpf: z.string().regex(/^\d{11}$/, { message: "CPF deve conter exatamente 11 dígitos numéricos" }),
    email: z.string().email({ message: "Email inválido" }),
    password: z.string().min(8, { message: "A senha deve ter no mínimo 8 caracteres" }),
    acessEnum: z.enum(["ADMIN", "USER"], { message: "Acesso inválido: deve ser 'ADMIN' ou 'USER'" }).optional().default("USER"),
    dataRegistro: z.date().optional(),
});

export default personSchema
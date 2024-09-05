import { IndexMetadata } from 'typeorm/metadata/IndexMetadata';
import { nativeEnum, z } from 'zod';


const personSchema = z.object({
    name: z.string(),
    imgurl: z.string().url(),
    cpf: z.string().min(11).max(11),
    email: z.string().email(),
    password: z.string(),
    isAdmin: z.boolean().optional().default(false),
    dataRegistro: z.date().optional(),
});

const adminSchema = personSchema.extend({
    isAdmin: z.literal(true),
    acess: z.number().min(1).max(5),
});

const personOrAdminSchema = z.discriminatedUnion('isAdmin', [
    personSchema,
    adminSchema,
])
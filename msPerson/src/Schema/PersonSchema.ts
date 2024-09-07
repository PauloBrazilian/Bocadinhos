import { IndexMetadata } from 'typeorm/metadata/IndexMetadata';
import { nativeEnum, z } from 'zod';


const personSchema = z.object({
    name: z.string(),
    imgurl: z.string().url(),
    cpf: z.string().min(11).max(11),
    email: z.string().email(),
    password: z.string(),
    acessEnum: z.string(),
    dataRegistro: z.date().optional(),
});

export default personSchema
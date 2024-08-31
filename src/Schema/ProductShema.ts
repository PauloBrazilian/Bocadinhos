import { z } from "zod";

const productShema = z.object({

    name: z.string().min(3).max(255),
    image: z.string().url(),
    quantity: z.number().positive(),
    price: z.number().positive(),    
    category: z.array(z.string().min(3).max(255)),

});

export default productShema;

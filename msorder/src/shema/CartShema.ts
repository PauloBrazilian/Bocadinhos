import { z } from "zod";

const cartShema = z.object({
  productId: z.number().int().positive(),
  personId: z.number().int().positive(),
});

export default cartShema;
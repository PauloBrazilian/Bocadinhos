import { z } from "zod";

const categoryShema = z.object({
    name: z.string().min(3).max(255),
});

export default categoryShema;
import { z } from "zod";

const categorySchema = z.object({
    name: z.string().min(3, { message: "Category name must be at least 3 characters long" }).max(255),
});

export default categorySchema;
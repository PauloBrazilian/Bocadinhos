import { z } from "zod";
import cartShema from "./CartShema";

const historySchema = z.object({
    cart: cartShema,    
    creationDate: z.date()
});

export default historySchema;
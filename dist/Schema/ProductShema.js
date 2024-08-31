"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const productShema = zod_1.z.object({
    name: zod_1.z.string().min(3).max(255),
    image: zod_1.z.string().url(),
    quantity: zod_1.z.number().positive(),
    price: zod_1.z.number().positive(),
    category: zod_1.z.array(zod_1.z.string().min(3).max(255)),
});
exports.default = productShema;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const personSchema = zod_1.z.object({
    name: zod_1.z.string(),
    imgurl: zod_1.z.string().url(),
    cpf: zod_1.z.string().min(11).max(11),
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
    acessEnum: zod_1.z.string(),
    dataRegistro: zod_1.z.date().optional(),
});
exports.default = personSchema;

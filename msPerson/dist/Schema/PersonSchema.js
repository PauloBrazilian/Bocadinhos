"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const personSchema = zod_1.z.object({
    name: zod_1.z.string(),
    imgurl: zod_1.z.string().url({ message: "url inválido" }),
    cpf: zod_1.z.string().regex(/^\d{11}$/, { message: "CPF deve conter exatamente 11 dígitos numéricos" }),
    email: zod_1.z.string().email({ message: "Email inválido" }),
    password: zod_1.z.string().min(8, { message: "A senha deve ter no mínimo 8 caracteres" }),
    acessEnum: zod_1.z.enum(["ADMIN", "USER"], { message: "Acesso inválido: deve ser 'ADMIN' ou 'USER'" }).optional().default("USER"),
    dataRegistro: zod_1.z.date().optional(),
});
exports.default = personSchema;
//# sourceMappingURL=PersonSchema.js.map
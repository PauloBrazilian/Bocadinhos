"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const categoryShema = zod_1.z.object({
    name: zod_1.z.string().min(3).max(255),
});
exports.default = categoryShema;

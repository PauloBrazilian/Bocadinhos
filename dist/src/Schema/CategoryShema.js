"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const categorySchema = zod_1.z.object({
    name: zod_1.z.string().min(3, { message: "Category name must be at least 3 characters long" }).max(255),
});
exports.default = categorySchema;
//# sourceMappingURL=CategoryShema.js.map
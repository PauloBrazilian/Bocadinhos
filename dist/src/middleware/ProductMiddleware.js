"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductShema_1 = __importDefault(require("../Schema/ProductShema"));
function productValidate(req, res, next) {
    try {
        ProductShema_1.default.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        else if (req.body.name.length < 3) {
            return res.status(400).json({ error: 'Product name must be at least 3 characters long' });
        }
        else if (req.body.image == null) {
            return res.status(400).json({ error: 'Product image URL is required' });
        }
        else if (req.body.category == null) {
            return res.status(400).json({ error: 'Product category is required' });
        }
    }
}
exports.default = { productValidate };
//# sourceMappingURL=ProductMiddleware.js.map
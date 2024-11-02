"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryShema_1 = __importDefault(require("../Schema/CategoryShema"));
function CategoryValidator(req, res, next) {
    try {
        CategoryShema_1.default.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        else {
            return res.status(400).json({ error });
        }
    }
}
function categoryName(req, res, next) {
    if (!req.params.name) {
        return res.status(400).json({ error: "Category name is required" });
    }
    else if (req.params.name.length < 3) {
        return res.status(400).json({ error: "Category name must be at least 3 characters long" });
    }
    else {
        next();
    }
}
exports.default = { CategoryValidator, categoryName };
//# sourceMappingURL=CategoryMiddleware.js.map
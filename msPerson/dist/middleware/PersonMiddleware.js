"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PersonSchema_1 = __importDefault(require("../Schema/PersonSchema"));
function PersonValidator(req, res, next) {
    try {
        PersonSchema_1.default.parse(req.body);
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
exports.default = { PersonValidator };
//# sourceMappingURL=PersonMiddleware.js.map
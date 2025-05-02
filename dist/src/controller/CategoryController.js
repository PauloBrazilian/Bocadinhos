"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const CategoryService_1 = __importDefault(require("../service/CategoryService"));
class CategoryController {
    constructor(dataSource) {
        this.categoryService = new CategoryService_1.default(dataSource);
    }
    createCategory(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createCategory = yield this.categoryService.createCategory(request.body);
                return response.status(201).json(createCategory);
            }
            catch (error) {
                if (error instanceof zod_1.z.ZodError) {
                    return response.status(400).json({ message: error.errors });
                }
                else {
                    return response.status(500).json({ message: error.message });
                }
            }
        });
    }
    findAllCategories(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield this.categoryService.findAllCategories();
                return response.status(200).json(categories);
            }
            catch (error) {
                return response.status(500).json({ message: error.message });
            }
        });
    }
    findAllProductsByCategories(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.categoryService.findAllProductsByCategories(request.params.name);
                return response.status(200).json(products);
            }
            catch (error) {
                return response.status(500).json({ message: error.message });
            }
        });
    }
}
exports.default = CategoryController;
//# sourceMappingURL=CategoryController.js.map
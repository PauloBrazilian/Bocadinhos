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
const ProductService_1 = __importDefault(require("../service/ProductService"));
const zod_1 = require("zod");
class ProductsController {
    constructor(dataSource) {
        this.productService = new ProductService_1.default(dataSource);
    }
    createProduct(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createProduct = yield this.productService.createProduct(request.body);
                return response.status(201).json(createProduct);
            }
            catch (error) {
                if (error instanceof zod_1.z.ZodError) {
                    return response.status(400).json({ message: error.message });
                }
                else {
                    return response.status(500).json({ message: error.message });
                }
            }
        });
    }
    findAllProducts(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.productService.findAllProducts();
                return response.status(200).json(products);
            }
            catch (error) {
                return response.status(500).json({ message: error.message });
            }
        });
    }
    findProductById(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.productService.findProductById(Number(request.params.id));
                return response.status(200).json(product);
            }
            catch (error) {
                return response.status(500).json({ message: error.message });
            }
        });
    }
    updateProduct(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedProduct = yield this.productService.updateProduct(Number(request.params.id), request.body);
                return response.status(200).json(updatedProduct);
            }
            catch (error) {
                if (error instanceof zod_1.z.ZodError) {
                    return response.status(400).json({ message: error.message });
                }
                else {
                    return response.status(500).json({ message: error.message });
                }
            }
        });
    }
    deleteProduct(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.productService.deleteProduct(Number(request.params.id));
                return response.status(200).send("Product deleted successfully.");
            }
            catch (error) {
                return response.status(500).json({ message: error.message });
            }
        });
    }
}
exports.default = ProductsController;
//# sourceMappingURL=ProductController.js.map
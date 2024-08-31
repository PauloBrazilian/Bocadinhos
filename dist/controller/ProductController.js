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
                    console.error(error.errors);
                    throw new Error("Invaled data");
                }
                else {
                    throw new Error("Internal server error");
                }
            }
        });
    }
    findProducts(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findProducts = yield this.productService.findProducts(request.body);
                return response.status(200).json(findProducts);
            }
            catch (error) {
                if (error instanceof zod_1.z.ZodError) {
                    console.error(error.errors);
                    throw new Error("Invaled data");
                }
                else {
                    throw new Error("Internal server error");
                }
            }
        });
    }
    findProductById(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findProductById = yield this.productService.findProductById(Number(request.params.id));
                return response.status(200).json(findProductById);
            }
            catch (error) {
                if (error instanceof zod_1.z.ZodError) {
                    console.error(error.errors);
                    throw new Error("Invaled data");
                }
                else {
                    throw new Error("Internal server error");
                }
            }
        });
    }
    updateProduct(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateProduct = yield this.productService.updateProduct(Number(request.params.id), request.body);
                return response.status(200).json(updateProduct);
            }
            catch (error) {
                if (error instanceof zod_1.z.ZodError) {
                    console.error(error.errors);
                    throw new Error("Invaled data");
                }
                else {
                    throw new Error("Internal server error");
                }
            }
        });
    }
    deleteProduct(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateProduct = yield this.productService.deleteProduct(Number(request.params.id));
                return response.status(204).json(updateProduct);
            }
            catch (error) {
                if (error instanceof zod_1.z.ZodError) {
                    console.error(error.errors);
                    throw new Error("Invaled data");
                }
                else {
                    throw new Error("Internal server error");
                }
            }
        });
    }
}
exports.default = ProductsController;

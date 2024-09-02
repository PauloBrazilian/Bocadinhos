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
const ProductShema_1 = __importDefault(require("../schema/ProductShema"));
const CategoryRepository_1 = require("../repositories/CategoryRepository");
const ProductRepository_1 = require("../repositories/ProductRepository");
class ProductService {
    constructor(dataSource) {
        this.productRepository = new ProductRepository_1.ProductRepository(dataSource);
        this.categoryRepository = new CategoryRepository_1.CategoryRepository(dataSource);
    }
    createProduct(object) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = ProductShema_1.default.parse(object);
            const category = yield this.getCategory(product.category[0]);
            const savedProduct = yield this.productRepository.save({
                name: product.name,
                price: product.price,
                quantity: product.quantity,
                imgUrl: product.image,
                category: category,
            });
            return savedProduct;
        });
    }
    findProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productRepository.findOne({ where: { id } });
            return product;
        });
    }
    findAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.productRepository.find();
            return products;
        });
    }
    updateProduct(id, object) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productRepository.findOne({ where: { id } });
            if (!product) {
                throw new Error('Product not found');
            }
            const updatedProduct = ProductShema_1.default.parse(object);
            const savedProduct = yield this.productRepository.save(Object.assign(Object.assign({}, product), { name: updatedProduct.name, price: updatedProduct.price, quantity: updatedProduct.quantity, imgUrl: updatedProduct.image, category: yield this.getCategory(updatedProduct.category[0]) }));
            return savedProduct;
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productRepository.findOne({ where: { id } });
            if (!product) {
                throw new Error('Product not found');
            }
            yield this.productRepository.remove(product);
            return true;
        });
    }
    getCategory(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield this.categoryRepository.findByName(name);
            if (!categories || categories.length === 0) {
                throw new Error('Category not found');
            }
            return categories[0];
        });
    }
}
exports.default = ProductService;

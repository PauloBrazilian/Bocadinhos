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
const CategoryRepository_1 = require("../repositories/CategoryRepository");
const CategoryShema_1 = __importDefault(require("../schema/CategoryShema"));
const ProductRepository_1 = require("../repositories/ProductRepository");
class CategoryService {
    constructor(dataSource) {
        this.productRepository = new ProductRepository_1.ProductRepository(dataSource);
        this.categoryRepository = new CategoryRepository_1.CategoryRepository(dataSource);
    }
    createCategory(object) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = CategoryShema_1.default.parse(object);
            const savedCategory = yield this.categoryRepository.save({
                categoryName: category.name
            });
            return savedCategory;
        });
    }
    findAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield this.categoryRepository.find();
            return categories;
        });
    }
    findAllProductsByCategories(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.productRepository.findByCategory(name);
            return products;
        });
    }
}
exports.default = CategoryService;

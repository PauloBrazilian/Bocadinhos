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
const CategoryController_1 = __importDefault(require("../../controller/CategoryController"));
const CategoryService_1 = __importDefault(require("../../service/CategoryService"));
const zod_1 = require("zod");
jest.mock('../../service/CategoryService');
const mockCategory = {
    id: 1,
    name: 'Electronics'
};
const mockCategories = [
    { id: 1, name: 'Electronics' },
    { id: 1, name: 'Fruits' },
];
const mockProduct = {
    id: 1,
    name: 'Laptop',
    price: 1500,
    quantity: 10,
    imgUrl: 'image_url',
    category: mockCategory,
};
const mockProducts = [
    { id: 1, name: 'Smartphone', imgUrl: 'http://example.com/Smartphone.png', quantity: 1, price: 1, category: { id: 1, categoryName: 'Electronics' } },
    { id: 1, name: 'Laptop', imgUrl: 'http://example.com/Laptop.png', quantity: 2, price: 2, category: { id: 1, categoryName: 'Electronics' } }
];
describe('CategoryController test suites', () => {
    let categoryController;
    let mockReq;
    let mockRes;
    let mockDataSource;
    beforeEach(() => {
        mockDataSource = {};
        categoryController = new CategoryController_1.default(mockDataSource);
        mockReq = {};
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });
    describe('createCategory', () => {
        it('should create a category and return 201 status', () => __awaiter(void 0, void 0, void 0, function* () {
            const category = mockCategory;
            CategoryService_1.default.prototype.createCategory.mockResolvedValue(category);
            mockReq.body = category;
            yield categoryController.createCategory(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith(category);
        }));
        it('should return 400 status if validation fails', () => __awaiter(void 0, void 0, void 0, function* () {
            const validationError = new zod_1.z.ZodError([]);
            CategoryService_1.default.prototype.createCategory.mockRejectedValue(validationError);
            mockReq.body = { name: '' };
            yield categoryController.createCategory(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({ message: validationError.errors });
        }));
        it('should return 500 status if an error occurs', () => __awaiter(void 0, void 0, void 0, function* () {
            const errorMessage = 'Internal Server Error';
            CategoryService_1.default.prototype.createCategory.mockRejectedValue(new Error(errorMessage));
            mockReq.body = { name: 'Test Category' };
            yield categoryController.createCategory(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({ message: errorMessage });
        }));
    });
    describe('findAllCategories', () => {
        it('should return all categories with 200 status', () => __awaiter(void 0, void 0, void 0, function* () {
            const categories = mockCategories;
            CategoryService_1.default.prototype.findAllCategories.mockResolvedValue(mockCategories);
            yield categoryController.findAllCategories(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(categories);
        }));
        it('should return 500 status if an error occurs', () => __awaiter(void 0, void 0, void 0, function* () {
            const errorMessage = 'Internal Server Error';
            CategoryService_1.default.prototype.findAllCategories.mockRejectedValue(new Error(errorMessage));
            yield categoryController.findAllCategories(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({ message: errorMessage });
        }));
    });
    describe('findAllProductsByCategories', () => {
        it('should return all products by category with 200 status', () => __awaiter(void 0, void 0, void 0, function* () {
            const products = mockProducts;
            CategoryService_1.default.prototype.findAllProductsByCategories.mockResolvedValue(mockProducts);
            mockReq.params = { name: 'Electronics' };
            yield categoryController.findAllProductsByCategories(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(mockProducts);
        }));
        it('should return 500 status if an error occurs', () => __awaiter(void 0, void 0, void 0, function* () {
            const errorMessage = 'Internal Server Error';
            CategoryService_1.default.prototype.findAllProductsByCategories.mockRejectedValue(new Error(errorMessage));
            mockReq.params = { name: 'Error' };
            yield categoryController.findAllProductsByCategories(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({ message: errorMessage });
        }));
    });
});
//# sourceMappingURL=CategoryController.test.js.map
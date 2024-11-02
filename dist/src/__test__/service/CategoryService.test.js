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
const typeorm_1 = require("typeorm");
const CategoryService_1 = __importDefault(require("../../service/CategoryService"));
const mockDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
});
const mockCategoryRepository = {
    findByName: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findyByCategory: jest.fn()
};
const mockProductRepository = {
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    remove: jest.fn(),
    findByCategory: jest.fn()
};
const mockCategory = {
    id: 1,
    categoryName: 'Electronics'
};
const mockCategories = [
    { id: 1, categoryName: 'Electronics' },
    { id: 2, categoryName: 'Books' }
];
const mockProducts = [
    { id: 1, name: 'Smartphone', imgUrl: 'http://example.com/Smartphone.png', quantity: 1, price: 1, category: { id: 1, categoryName: 'Electronics' } },
    { id: 1, name: 'Laptop', imgUrl: 'http://example.com/Laptop.png', quantity: 2, price: 2, category: { id: 1, categoryName: 'Electronics' } }
];
jest.mock('../../repositories/CategoryRepository', () => ({
    CategoryRepository: jest.fn().mockImplementation(() => mockCategoryRepository),
}));
jest.mock('../../repositories/ProductRepository', () => ({
    ProductRepository: jest.fn().mockImplementation(() => mockProductRepository),
}));
describe('CategoryService test suite', () => {
    let categoryService;
    beforeEach(() => {
        categoryService = new CategoryService_1.default(mockDataSource);
    });
    afterAll(() => {
        jest.clearAllMocks();
    });
    describe('createCategory', () => {
        it('should create a new category', () => __awaiter(void 0, void 0, void 0, function* () {
            const category = mockCategory;
            mockCategoryRepository.save.mockResolvedValue(category);
            const result = yield categoryService.createCategory({ name: 'Electronics' });
            expect(mockCategoryRepository.save).toHaveBeenCalledWith({ categoryName: 'Electronics' });
            expect(result).toEqual(category);
        }));
    });
    describe('findAllCategories', () => {
        it('should return all categories', () => __awaiter(void 0, void 0, void 0, function* () {
            mockCategoryRepository.find.mockResolvedValue(mockCategories);
            const result = yield categoryService.findAllCategories();
            expect(mockCategoryRepository.find).toHaveBeenCalled();
            expect(result).toEqual(mockCategories);
        }));
    });
    describe('findAllProductsByCategories', () => {
        it('should return products by category name', () => __awaiter(void 0, void 0, void 0, function* () {
            mockProductRepository.findByCategory.mockResolvedValue(mockProducts);
            const result = yield categoryService.findAllProductsByCategories(mockCategory.categoryName);
            expect(mockProductRepository.findByCategory).toHaveBeenCalledWith(mockCategory.categoryName);
            expect(result).toEqual(mockProducts);
        }));
    });
});
//# sourceMappingURL=CategoryService.test.js.map
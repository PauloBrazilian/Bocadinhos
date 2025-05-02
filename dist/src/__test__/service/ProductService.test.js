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
const ProductService_1 = __importDefault(require("../../service/ProductService"));
const mockDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
});
const mockCategoryRepository = {
    findByName: jest.fn(),
};
const mockProductRepository = {
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    remove: jest.fn(),
};
const mockCategory = {
    id: 1,
    name: 'Electronics'
};
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
jest.mock('../../repositories/CategoryRepository', () => ({
    CategoryRepository: jest.fn().mockImplementation(() => mockCategoryRepository),
}));
jest.mock('../../repositories/ProductRepository', () => ({
    ProductRepository: jest.fn().mockImplementation(() => mockProductRepository),
}));
describe('ProductService test suite', () => {
    let productService;
    beforeEach(() => {
        productService = new ProductService_1.default(mockDataSource);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('createProduct', () => {
        it('should create and return a product', () => __awaiter(void 0, void 0, void 0, function* () {
            const product = mockProduct;
            mockCategoryRepository.findByName.mockResolvedValue([mockCategory]);
            mockProductRepository.save.mockResolvedValue(product);
            const result = yield productService.createProduct({
                name: 'Laptop',
                price: 1500,
                quantity: 10,
                image: 'image_url',
                category: ['Electronics'],
            });
            expect(mockCategoryRepository.findByName).toHaveBeenCalledWith('Electronics');
            expect(mockProductRepository.save).toHaveBeenCalledWith({
                name: 'Laptop',
                price: 1500,
                quantity: 10,
                imgUrl: 'image_url',
                category: mockCategory,
            });
            expect(result).toEqual(mockProduct);
        }));
        it('should throw an error if category is not found', () => __awaiter(void 0, void 0, void 0, function* () {
            mockCategoryRepository.findByName.mockResolvedValue([]);
            yield expect(productService.createProduct({
                name: 'Laptop',
                price: 1500,
                quantity: 10,
                image: 'image_url',
                category: ['NaN'],
            })).rejects.toThrow('Category not found');
        }));
    });
    describe('findProductById', () => {
        it('should return a product by id', () => __awaiter(void 0, void 0, void 0, function* () {
            mockProductRepository.findOne.mockResolvedValue(mockProduct);
            const result = yield productService.findProductById(1);
            expect(mockProductRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(result).toEqual(mockProduct);
        }));
        it('should return null if product is not found', () => __awaiter(void 0, void 0, void 0, function* () {
            mockProductRepository.findOne.mockResolvedValue(null);
            const result = yield productService.findProductById(999);
            expect(mockProductRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
            expect(result).toBeNull();
        }));
    });
    describe('findAllProducts', () => {
        it('should return all products', () => __awaiter(void 0, void 0, void 0, function* () {
            mockProductRepository.find.mockResolvedValue(mockProducts);
            const result = yield productService.findAllProducts();
            expect(mockProductRepository.find).toHaveBeenCalled();
            expect(result).toEqual(mockProducts);
        }));
    });
    describe('updateProduct', () => {
        it('should update and return the product', () => __awaiter(void 0, void 0, void 0, function* () {
            mockProductRepository.findOne.mockResolvedValue(mockProduct);
            mockCategoryRepository.findByName.mockResolvedValue([mockCategory]);
            mockProductRepository.save.mockResolvedValue(Object.assign(Object.assign({}, mockProduct), { name: 'Updated Laptop' }));
            const result = yield productService.updateProduct(1, {
                name: 'Updated Laptop',
                price: 1600,
                quantity: 5,
                image: 'new_image_url',
                category: ['Electronics'],
            });
            expect(mockProductRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(mockProductRepository.save).toHaveBeenCalledWith(Object.assign(Object.assign({}, mockProduct), { name: 'Updated Laptop', price: 1600, quantity: 5, imgUrl: 'new_image_url', category: mockCategory }));
            expect(result.name).toBe('Updated Laptop');
        }));
        it('should throw an error if product is not found', () => __awaiter(void 0, void 0, void 0, function* () {
            mockProductRepository.findOne.mockResolvedValue(null);
            yield expect(productService.updateProduct(999, {
                name: 'Updated Laptop',
                price: 1600,
                quantity: 5,
                image: 'new_image_url',
                category: ['Electronics'],
            })).rejects.toThrow('Product not found');
        }));
    });
    describe('deleteProduct', () => {
        it('should delete the product and return true', () => __awaiter(void 0, void 0, void 0, function* () {
            mockProductRepository.findOne.mockResolvedValue(mockProduct);
            const result = yield productService.deleteProduct(1);
            expect(mockProductRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(mockProductRepository.remove).toHaveBeenCalledWith(mockProduct);
            expect(result).toBe(true);
        }));
        it('should throw an error if product is not found', () => __awaiter(void 0, void 0, void 0, function* () {
            mockProductRepository.findOne.mockResolvedValue(null);
            yield expect(productService.deleteProduct(999)).rejects.toThrow('Product not found');
        }));
    });
});
//# sourceMappingURL=ProductService.test.js.map
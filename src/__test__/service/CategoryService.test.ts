import { DataSource } from 'typeorm';
import CategoryService from '../../service/CategoryService';

const mockDataSource = new DataSource({
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
  let categoryService: CategoryService;

  beforeEach(() => {    
    categoryService = new CategoryService(mockDataSource);    
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('createCategory', () => {
    it('should create a new category', async () => {
      const category = mockCategory;  
      mockCategoryRepository.save.mockResolvedValue(category);  
      const result = await categoryService.createCategory({ name: 'Electronics' });

      expect(mockCategoryRepository.save).toHaveBeenCalledWith({ categoryName: 'Electronics' });     
      expect(result).toEqual(category);
    });

  })

  describe('findAllCategories', () => {
    it('should return all categories', async () => {  
      mockCategoryRepository.find.mockResolvedValue(mockCategories);  
      const result = await categoryService.findAllCategories();
  
      expect(mockCategoryRepository.find).toHaveBeenCalled();
      expect(result).toEqual(mockCategories);
    });
  
  })

  describe('findAllProductsByCategories', () => { 
    it('should return products by category name', async () => {
      mockProductRepository.findByCategory.mockResolvedValue(mockProducts);
      const result = await categoryService.findAllProductsByCategories(mockCategory.categoryName);
  
      expect(mockProductRepository.findByCategory).toHaveBeenCalledWith(mockCategory.categoryName);
      expect(result).toEqual(mockProducts);
    });

   })

});

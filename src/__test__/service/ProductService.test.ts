import { DataSource } from 'typeorm';
import ProductService from '../../service/ProductService';

const mockDataSource = new DataSource({
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
  let productService: ProductService;

  beforeEach(() => {
    productService = new ProductService(mockDataSource);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createProduct', () => {
    it('should create and return a product', async () => {
      const product = mockProduct;
      mockCategoryRepository.findByName.mockResolvedValue([mockCategory]);
      mockProductRepository.save.mockResolvedValue(product);

      const result = await productService.createProduct({
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
    });

     it('should throw an error if category is not found', async () => {
      mockCategoryRepository.findByName.mockResolvedValue([]);

      await expect(productService.createProduct({
          name: 'Laptop',
          price: 1500,
          quantity: 10,
          image: 'image_url',
          category: ['NaN'],
        }),
      ).rejects.toThrow('Category not found');
    });

  });

  describe('findProductById', () => {
    it('should return a product by id', async () => {
      mockProductRepository.findOne.mockResolvedValue(mockProduct);
      const result = await productService.findProductById(1);

      expect(mockProductRepository.findOne).toHaveBeenCalledWith({where: { id: 1 }});
      expect(result).toEqual(mockProduct);
    });

    it('should return null if product is not found', async () => {
      mockProductRepository.findOne.mockResolvedValue(null);
      const result = await productService.findProductById(999);

      expect(mockProductRepository.findOne).toHaveBeenCalledWith({where: { id: 999 }});
      expect(result).toBeNull();
    });

  });

  describe('findAllProducts', () => {
    it('should return all products', async () => {     
      mockProductRepository.find.mockResolvedValue(mockProducts);
      const result = await productService.findAllProducts();

      expect(mockProductRepository.find).toHaveBeenCalled();
      expect(result).toEqual(mockProducts);
    });

  });

  describe('updateProduct', () => {
    it('should update and return the product', async () => {   
      mockProductRepository.findOne.mockResolvedValue(mockProduct);
      mockCategoryRepository.findByName.mockResolvedValue([mockCategory]);
      mockProductRepository.save.mockResolvedValue({
        ...mockProduct,
        name: 'Updated Laptop',
      });

      const result = await productService.updateProduct(1, {
        name: 'Updated Laptop',
        price: 1600,
        quantity: 5,
        image: 'new_image_url',
        category: ['Electronics'],
      });

      expect(mockProductRepository.findOne).toHaveBeenCalledWith({where: { id: 1 }});
      expect(mockProductRepository.save).toHaveBeenCalledWith({
        ...mockProduct,
        name: 'Updated Laptop',
        price: 1600,
        quantity: 5,
        imgUrl: 'new_image_url',
        category: mockCategory,
      });
      expect(result.name).toBe('Updated Laptop');
    });

    it('should throw an error if product is not found', async () => {
      mockProductRepository.findOne.mockResolvedValue(null);

      await expect(productService.updateProduct(999, {
          name: 'Updated Laptop',
          price: 1600,
          quantity: 5,
          image: 'new_image_url',
          category: ['Electronics'],
        }),
      ).rejects.toThrow('Product not found');
    });

  });

  describe('deleteProduct', () => {
    it('should delete the product and return true', async () => {      
      mockProductRepository.findOne.mockResolvedValue(mockProduct);
      const result = await productService.deleteProduct(1);

      expect(mockProductRepository.findOne).toHaveBeenCalledWith({where: { id: 1 }});
      expect(mockProductRepository.remove).toHaveBeenCalledWith(mockProduct);
      expect(result).toBe(true);
    });

    it('should throw an error if product is not found', async () => {
      mockProductRepository.findOne.mockResolvedValue(null);

      await expect(productService.deleteProduct(999)).rejects.toThrow('Product not found');
    });

  });

});

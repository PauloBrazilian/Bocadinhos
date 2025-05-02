import { Request, Response } from 'express';
import { DataSource } from 'typeorm';
import CategoryController from '../../controller/CategoryController';
import CategoryService from '../../service/CategoryService';
import { z } from 'zod';

jest.mock('../../service/CategoryService');

const mockCategory = { 
  id: 1, 
  name: 'Electronics' 
};

const mockCategories = [
  {id: 1, name: 'Electronics'},
  {id: 1, name: 'Fruits'},
]

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
  let categoryController: CategoryController;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockDataSource: DataSource;

  beforeEach(() => {
    mockDataSource = {} as DataSource;
    categoryController = new CategoryController(mockDataSource);
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('createCategory', () => {
    it('should create a category and return 201 status', async () => {
      const category = mockCategory;
      (CategoryService.prototype.createCategory as jest.Mock).mockResolvedValue(category);
      mockReq.body = category;

      await categoryController.createCategory(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(category);
    });

    it('should return 400 status if validation fails', async () => {
      const validationError = new z.ZodError([]);
      (CategoryService.prototype.createCategory as jest.Mock).mockRejectedValue(validationError);
      mockReq.body = { name: '' };

      await categoryController.createCategory(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({message: validationError.errors});
    });

    it('should return 500 status if an error occurs', async () => {
      const errorMessage = 'Internal Server Error';
      (CategoryService.prototype.createCategory as jest.Mock).mockRejectedValue(
        new Error(errorMessage),
      );
      mockReq.body = { name: 'Test Category' };

      await categoryController.createCategory(
        mockReq as Request,
        mockRes as Response,
      );

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe('findAllCategories', () => {
    it('should return all categories with 200 status', async () => {
      const categories = mockCategories;
      (CategoryService.prototype.findAllCategories as jest.Mock).mockResolvedValue(mockCategories);

      await categoryController.findAllCategories(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(categories);
    });

    it('should return 500 status if an error occurs', async () => {
      const errorMessage = 'Internal Server Error';
      (CategoryService.prototype.findAllCategories as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await categoryController.findAllCategories(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ message: errorMessage });
    });

  });

  describe('findAllProductsByCategories', () => {
    it('should return all products by category with 200 status', async () => {
      const products = mockProducts;
      (CategoryService.prototype.findAllProductsByCategories as jest.Mock).mockResolvedValue(mockProducts);
      mockReq.params = { name: 'Electronics' };

      await categoryController.findAllProductsByCategories(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockProducts);
    });

    it('should return 500 status if an error occurs', async () => {
      const errorMessage = 'Internal Server Error';
      (CategoryService.prototype.findAllProductsByCategories as jest.Mock).mockRejectedValue(new Error(errorMessage));
      mockReq.params = { name: 'Error' };

      await categoryController.findAllProductsByCategories(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ message: errorMessage });
    });

  });

});

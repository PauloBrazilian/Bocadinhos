import { Request, Response } from 'express';
import ProductService from '../service/ProductService';
import { DataSource } from 'typeorm';
import { z } from 'zod';

export default class ProductsController {

    private productService: ProductService;

    constructor(dataSource: DataSource) {
        this.productService = new ProductService(dataSource);
    }

    async createProduct(request: Request, response: Response): Promise<Response> {
        try {
            const createProduct = await this.productService.createProduct(request.body);
            return response.status(201).json(createProduct);
        } catch (error) {
            if (error instanceof z.ZodError) {
                console.error(error.errors);
                throw new Error("Invaled data");
            }else{
                throw new Error("Internal server error");                
            }
        }  
    }

    async findProducts(request: Request, response: Response): Promise<Response> {
        try {
            const findProducts = await this.productService.findProducts(request.body);
            return response.status(200).json(findProducts);
        } catch (error) {
            if (error instanceof z.ZodError) {
                console.error(error.errors);
                throw new Error("Invaled data");
            }else{
                throw new Error("Internal server error");                
            }
        }
    }

    async findProductById(request: Request, response: Response): Promise<Response> {
        try {
            const findProductById = await this.productService.findProductById(Number(request.params.id));
            return response.status(200).json(findProductById);
        } catch (error) {
            if (error instanceof z.ZodError) {
                console.error(error.errors);
                throw new Error("Invaled data");
            }else{
                throw new Error("Internal server error");                
            }
        }
    }

    async updateProduct(request: Request, response: Response): Promise<Response> {
        try {
            const updateProduct = await this.productService.updateProduct(Number(request.params.id), request.body);
            return response.status(200).json(updateProduct);
        } catch (error) {
            if (error instanceof z.ZodError) {
                console.error(error.errors);
                throw new Error("Invaled data");
            }else{
                throw new Error("Internal server error");                
            }
        }
    }

    async deleteProduct(request: Request, response: Response): Promise<Response> {
        try {
            const updateProduct = await this.productService.deleteProduct(Number(request.params.id));
            return response.status(204).json(updateProduct);
        } catch (error) {
            if (error instanceof z.ZodError) {
                console.error(error.errors);
                throw new Error("Invaled data");
            }else{
                throw new Error("Internal server error");                
            }
        }
    }
}

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

    async findAllProducts(request: Request, response: Response): Promise<Response> {
        try {
            const products = await this.productService.findAllProducts();
            return response.status(200).json(products);
        } catch (error) {
            console.error(error);
            throw new Error("Internal server error");
        }
    }


    async findProductById(request: Request, response: Response): Promise<Response> {
        try {
            const product = await this.productService.findProductById(Number(request.params.id));   
            return response.status(200).json(product);
        } catch (error) {
            console.error(error);
            throw new Error("Internal server error");
        }
    }

    async updateProduct(request: Request, response: Response): Promise<Response> {
        try {
            const updatedProduct = await this.productService.updateProduct(Number(request.params.id), request.body);
            return response.status(200).json(updatedProduct);
        } catch (error) {
            console.error(error);
            throw new Error("Internal server error");
        }
    }

    async deleteProduct(request: Request, response: Response): Promise<Response> {
        try {
            await this.productService.deleteProduct(Number(request.params.id));
            return response.status(204).send("Product deleted successfully.");
        } catch (error) {
            console.error(error);
            throw new Error("Internal server error");
        }
    }

}

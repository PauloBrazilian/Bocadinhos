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
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                return response.status(400).json({ message: error.message})  
            }else{
                return response.status(500).json({ message: error.message})              
            }
        }  
    }

    async findAllProducts(request: Request, response: Response): Promise<Response> {
        try {
            const products = await this.productService.findAllProducts();
            return response.status(200).json(products);
        } catch (error: any) {
            return response.status(500).json({ message: error.message})   
        }
    }


    async findProductById(request: Request, response: Response): Promise<Response> {
        try {
            const product = await this.productService.findProductById(Number(request.params.id));   
            return response.status(200).json(product);
        } catch (error: any) {
            return response.status(500).json({ message: error.message})   
        }
    }

    async updateProduct(request: Request, response: Response): Promise<Response> {
        try {
            const updatedProduct = await this.productService.updateProduct(Number(request.params.id), request.body);
            return response.status(200).json(updatedProduct);
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                return response.status(400).json({ message: error.message})  
            }else{
                return response.status(500).json({ message: error.message})              
            }
        }
    }

    async deleteProduct(request: Request, response: Response): Promise<Response> {
        try {
            await this.productService.deleteProduct(Number(request.params.id));
            return response.status(200).send("Product deleted successfully.");
        } catch (error: any) {
            return response.status(500).json({ message: error.message}) 
        }
    }

}
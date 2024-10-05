import { Request, Response } from 'express';
import { DataSource } from "typeorm";
import { z } from "zod";
import CategoryService from "../service/CategoryService";

export default class CategoryController {
    
    private categoryService: CategoryService;

    constructor(dataSource: DataSource) {
        this.categoryService = new CategoryService(dataSource);
    }

    async createCategory(request: Request, response: Response): Promise<Response> {
        try {
            const createCategory = await this.categoryService.createCategory(request.body);
            return response.status(201).json(createCategory);
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                return response.status(400).json({ message: error.errors });
            } else {
                return response.status(500).json({ message: error.message });
            }
        }
    }

    async findAllCategories(request: Request, response: Response): Promise<Response> {
        try {
            const categories = await this.categoryService.findAllCategories();
            return response.status(200).json(categories);
        } catch (error: any) {
            return response.status(500).json({ message: error.message });
        }
    }

    async findAllProductsByCategories(request: Request, response: Response): Promise<Response> {
        try {
            const products = await this.categoryService.findAllProductsByCategories(request.params.name);
            return response.status(200).json(products);
        } catch (error: any) {
            return response.status(500).json({ message: error.message });
        }
    }
}
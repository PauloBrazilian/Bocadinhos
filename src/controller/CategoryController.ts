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
        } catch (error) {
            if (error instanceof z.ZodError) {
                console.error(error.errors);
                throw new Error("Invaled data");
            } else {
                throw new Error("Internal server error");
            }
        }
    }

    async findAllCategories(request: Request, response: Response): Promise<Response> {
        try {
            const categories = await this.categoryService.findAllCategories();
            return response.status(200).json(categories);
        } catch (error) {
            console.error(error);
            throw new Error("Internal server error");
        }
    }

    async findAllProductsByCategories(request: Request, response: Response): Promise<Response> {
        try {
            const products = await this.categoryService.findAllProductsByCategories(request.params.name);
            return response.status(200).json(products);
        } catch (error) {
            console.error(error);
            throw new Error("Internal server error");
        }
    }
}
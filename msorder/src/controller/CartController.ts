import { Request, Response } from "express";
import CartService from "../service/CartService";
import { z } from "zod";
import { json } from "stream/consumers";

export default class CartController {
    
    private cartService: CartService;
    
    constructor() {
        this.cartService = new CartService(); 
    }

    async createCart(req: Request, res: Response): Promise<Response> {
        try {
            const cart = await this.cartService.createCart(req.body);
            return res.status(201).json(cart); 
        }catch (error: any) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: error.message})  
            }else{
                return res.status(500).json({ message: error.message})              
            }
        }
    }
    
    async findAllCarts(req: Request, res: Response): Promise<Response> {
        try {
            const carts = await this.cartService.findAllCarts();
            return res.status(200).json(carts);
        }catch (error: any) {   
            return res.status(500).json({ message: error.message})              
        }
    }

    async findCartById(req: Request, res: Response): Promise<Response> {        
        try {
            const cart = await this.cartService.findCartById(Number(req.params.id));
            return res.status(200).json(cart);
        }catch (error: any) {   
            return res.status(500).json({ message: error.message})              
        }
    }

    async updateCart(req: Request, res: Response): Promise<Response> {
        try {
            const cart = await this.cartService.updateCart(Number(req.params.id), req.body);
            return res.status(200).json(cart);
        }catch (error: any) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: error.message})  
            }else{
                return res.status(500).json({ message: error.message})              
            }            
        }
    }

    async deleteCart(req: Request, res: Response): Promise<Response> {
        try {
            await this.cartService.deleteCart(Number(req.params.id));
            return res.status(200).send("Cart deleted successfully.");
        }catch (error: any) {
            return res.status(500).json({ message: error.message})              
        }
    }
                                
}
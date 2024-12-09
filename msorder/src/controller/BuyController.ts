import { Request, Response } from "express";
import BuyService from '../service/BuyService';
import { z } from "zod";

export default class BuyController {

    private buyService: BuyService;

    constructor() {
        this.buyService = new BuyService(); 
    }

    async createBuy(req: Request, res: Response): Promise<Response> {        
        try {
            const buy = await this.buyService.createBuy(req.body);
            return res.status(201).json(buy); 
        }catch (error: any) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: error.message})  
            }else{
                return res.status(500).json({ message: error.message})              
            }
        }
    }

    async findAllBuys(req: Request, res: Response): Promise<Response>{
        try{
            const buys = await this.buyService.findAllBuys();
            return res.status(200).json(buys);
        }catch(error: any){
            return res.status(500).json({message: error.message})    
        }
    }    

    async findBuyById(req: Request, res: Response): Promise<Response>{
        try{
            const buy = await this.buyService.findBuyById(Number(req.params.id));
            return res.status(200).json(buy);
        }catch(error: any){
            return res.status(500).json({message: error.message})
        }        
    }

    async updateBuy(req: Request, res: Response): Promise<Response>{
        try {
            const buy = await this.buyService.updateBuy(Number(req.params.id), req.body)
            return res.status(200).json(buy);
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({message: error.message})
            } else {
                return res.status(500).json({message: error.message})
            }
            
        }
    }

    async deleteBuy(req: Request, res: Response): Promise<Response>{
        try {
            await this.buyService.deleteBuy(Number(req.params.id))
            return res.status(200).send("Buy deleted successfully.")
        } catch (error: any) {
            return res.status(500).json({message: error.message})
        }    
    }

}

import { z } from "zod";
import HistoryService from "../service/HistoryService";
import { Request, Response } from 'express';

export default class HistoryController {
    
    private historyService: HistoryService;
      
    constructor() {
        this.historyService = new HistoryService(); 
    }

    async createHistory(req: Request, res: Response): Promise<Response> {
        try {
            const createHistory = await this.historyService.createHistory(req.body);
            return res.status(201).json(createHistory); 
        }catch (error: any) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: error.message})  
            }else{
                return res.status(500).json({ message: error.message})              
            }
        }
    }
   
    async findAllHistories(req: Request, res: Response): Promise<Response> {
        try {
            const histories = await this.historyService.findAllHistories();
            return res.status(200).json(histories);
        }catch (error: any) {   
            return res.status(500).json({ message: error.message})              
        }
    }

    async findHistoryById(req: Request, res: Response): Promise<Response> {
        try {
            const history = await this.historyService.findHistoryById(Number(req.params.id));
            return res.status(200).json(history);
        }catch (error: any) {   
            return res.status(500).json({ message: error.message})              
        }
    }
    
    async updateHistory(req: Request, res: Response): Promise<Response> {
        try {
            const history = await this.historyService.updateHistory(Number(req.params.id), req.body);
            return res.status(200).json(history);
        }catch (error: any) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: error.message})  
            }else{
                return res.status(500).json({ message: error.message})              
            }            
        }
    }
    
    async deleteHistory(req: Request, res: Response): Promise<Response> {
        try {
            await this.historyService.deleteHistory(Number(req.params.id));
            return res.status(200).send("History deleted successfully.");
        }catch (error: any) {
            return res.status(500).json({ message: error.message})              
        }
    }

}
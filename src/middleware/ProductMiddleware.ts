import { Request, Response, NextFunction } from "express";
import productShema from '../schema/ProductShema';

function productValidate(req: Request, res: Response, next: NextFunction) {
    try {
      productShema.parse(req.body);
      next();
    } catch (error) {
      if(error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }else if (req.body.name.length < 3) {
        return res.status(400).json({ error:'Product name must be at least 3 characters long' });
      }else if (req.body.image == null) {
        return res.status(400).json({ error:'Product image URL is required' });
      }else if(req.body.category == null ){
        return res.status(400).json({ error:'Product category is required' });
      }  
    }    
}

export default { productValidate };
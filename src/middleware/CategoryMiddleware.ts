import { Request, Response, NextFunction } from "express";
import categorySchema from "../schema/CategoryShema";

function CategoryValidator(req: Request, res: Response, next: NextFunction) {
  try {
    categorySchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    } else {
      return res.status(400).json({ error });
    }
  }
}

function categoryName(req: Request, res: Response, next: NextFunction) {  
  if (!req.params.name) {
    return res.status(400).json({ error: "Category name is required" });
  } else if (req.params.name.length < 3) {
    return res.status(400).json({ error: "Category name must be at least 3 characters long" });
  } else {
    next();
  }
}

export default { CategoryValidator, categoryName };
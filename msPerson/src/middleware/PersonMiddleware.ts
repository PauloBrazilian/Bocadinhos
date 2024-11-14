import { Request, Response, NextFunction } from 'express';
import PersonSchema from '../Schema/PersonSchema';

function PersonValidator(req: Request, res: Response, next: NextFunction) {
  try {
    PersonSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    } else {
      return res.status(400).json({ error });
    }
  }
}



export default { PersonValidator };
import { Request, Response, NextFunction } from 'express';


const loggingAndValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    
    console.log(`Received ${req.method} request for ${req.url}`);

    if (req.method === 'POST' || req.method === 'PUT') {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Name field is required' });
        }
    }

    next();
};

export default loggingAndValidationMiddleware;
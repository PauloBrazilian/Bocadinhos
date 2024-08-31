"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loggingAndValidationMiddleware = (req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    if (req.method === 'POST' || req.method === 'PUT') {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Name field is required' });
        }
    }
    next();
};
exports.default = loggingAndValidationMiddleware;

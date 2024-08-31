import express from 'express';
import productRoutes from './routes'; 
import loggingAndValidationMiddleware from './middleware/loggingAndValidationMiddleware';

class App {
    public server: express.Application;

    constructor() {
        this.server = express();
        this.routes();
    }

    private routes(): void {
        this.server.use(express.json());
        this.server.use(loggingAndValidationMiddleware);
        this.server.use('/products', productRoutes);
    }
}

export default new App().server;
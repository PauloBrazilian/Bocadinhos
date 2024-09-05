import express from 'express';
import emailRoutes from './routes/EmailRoutes';

class App {
    public server: express.Application;

    constructor() {
        this.server = express();
        this.routes();
    }

    private routes(): void {
        this.server.use(express.json());
        this.server.use('/email', emailRoutes);
    }
}

export default new App().server;
import express from 'express';

class App {
    public server: express.Application;

    constructor() {
        this.server = express();
        this.routes();
    }

    private routes(): void {
        this.server.use(express.json());
    }
}

export default new App().server;
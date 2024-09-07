import express from "express";
import personRoutes from "./routes/PersonRoute"

class App {
    public server: express.Application;

    constructor() {
        this.server = express();
        this.routes();
    }

    private routes(): void {
        this.server.use(express.json());
        this.server.use('/person', personRoutes);
    }
}

export default new App().server;
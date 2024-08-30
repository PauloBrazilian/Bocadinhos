import e from "express";
import routes from "./routes";

class App{

    public server: e.Application;

    constructor(){
        this.server = e();
        this.routes();
    }

    private routes(): void{
        this.server.use(routes);
    }

}

export default new App().server;
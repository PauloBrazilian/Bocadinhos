import express from 'express';
import productRoutes from './routes/ProductRoutes';
import categoryRoutes from './routes/CategoryRoutes';

class App {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.routes();
  }

  private routes(): void {
    this.server.use(express.json());
    this.server.use('/products', productRoutes);
    this.server.use('/categories', categoryRoutes);
  }
}

export default new App().server;

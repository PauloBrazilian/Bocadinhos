import express from 'express';
import cartRoutes from './routes/CartRoutes'
import historyRoutes from './routes/HistoryRoutes'

class App {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.routes();
  }

  private routes(): void {
    this.server.use(express.json());
    this.server.use('/cart', cartRoutes);
    this.server.use('/history', historyRoutes);
  }
  
}

export default new App().server;
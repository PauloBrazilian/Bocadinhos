import { Router } from 'express';
import ProductsController from '../controller/ProductController';
import { AppDataSource } from '../DataSource';

const router = Router();
const dataSource = AppDataSource;
const productsController = new ProductsController(dataSource);

router.post('/', (req, res) => productsController.createProduct(req, res));
router.get('/', (req, res) => productsController.findAllProducts(req, res));
router.get('/:id', (req, res) => productsController.findProductById(req, res));
router.put('/:id', (req, res) => productsController.updateProduct(req, res));
router.delete('/:id', (req, res) => productsController.deleteProduct(req, res));

export default router;
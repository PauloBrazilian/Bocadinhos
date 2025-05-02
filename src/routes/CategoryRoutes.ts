import { Router } from 'express';
import { AppDataSource } from '../DataSource';
import CategoryController from '../controller/CategoryController';
import CategoryMiddleware from '../middleware/CategoryMiddleware';

const router = Router();
const dataSource = AppDataSource;
const categoryController = new CategoryController(dataSource);

router.post('/', CategoryMiddleware.CategoryValidator, (req, res) => categoryController.createCategory(req, res));
router.get('/', (req, res) => categoryController.findAllCategories(req, res));
router.get('/:name', CategoryMiddleware.categoryName, (req, res) => categoryController.findAllProductsByCategories(req, res));

export default router;
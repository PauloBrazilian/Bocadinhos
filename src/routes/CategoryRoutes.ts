import { Router } from "express";
import { AppDataSource } from "../DataSource";
import CategoryController from "../controller/CategoryController";

const router = Router();
const dataSource = AppDataSource;
const categoryController = new CategoryController(dataSource);

router.post("/", (req, res) => categoryController.createCategory(req, res));
router.get("/", (req, res) => categoryController.findAllCategories(req, res));
router.get("/:name", (req, res) => categoryController.findAllProductsByCategories(req, res));

export default router;
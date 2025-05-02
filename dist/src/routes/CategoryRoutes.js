"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DataSource_1 = require("../DataSource");
const CategoryController_1 = __importDefault(require("../controller/CategoryController"));
const CategoryMiddleware_1 = __importDefault(require("../middleware/CategoryMiddleware"));
const router = (0, express_1.Router)();
const dataSource = DataSource_1.AppDataSource;
const categoryController = new CategoryController_1.default(dataSource);
router.post('/', CategoryMiddleware_1.default.CategoryValidator, (req, res) => categoryController.createCategory(req, res));
router.get('/', (req, res) => categoryController.findAllCategories(req, res));
router.get('/:name', CategoryMiddleware_1.default.categoryName, (req, res) => categoryController.findAllProductsByCategories(req, res));
exports.default = router;
//# sourceMappingURL=CategoryRoutes.js.map
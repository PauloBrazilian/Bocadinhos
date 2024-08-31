"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_1 = __importDefault(require("./controller/ProductController"));
const DataSource_1 = require("./DataSource");
const router = (0, express_1.Router)();
const dataSource = DataSource_1.AppDataSource;
const productsController = new ProductController_1.default(dataSource);
router.post('/', (req, res) => productsController.createProduct(req, res));
// router.get('/', (req, res) => productsController.findProducts(req, res));
// router.get('/:id', (req, res) => productsController.findProductById(req, res));
// router.put('/:id', (req, res) => productsController.updateProduct(req, res));
// router.delete('/:id', (req, res) => productsController.deleteProduct(req, res));
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PersonController_1 = __importDefault(require("../controller/PersonController"));
const DataSource_1 = require("../DataSource");
const express_1 = require("express");
const router = (0, express_1.Router)();
const dataSource = DataSource_1.AppDataSource;
const personController = new PersonController_1.default(dataSource);
router.post('/', (req, res) => personController.createPerson(req, res));
router.get('/', (req, res) => personController.findAllPersons(req, res));
router.get('/', (req, res) => personController.findPersonByEmail(req, res));
exports.default = router;

import PersonController from "../controller/PersonController";
import { AppDataSource } from "../DataSource";
import { Router } from "express";

const router = Router();

const dataSource = AppDataSource;
const personController = new PersonController(dataSource);

router.post('/',(req, res) => personController.createPerson(req, res));
router.get('/',(req, res) => personController.findAllPersons(req, res));
router.get('/',(req, res) => personController.findPersonByEmail(req, res));


export default router
import PersonController from "../controller/PersonController";
import { AppDataSource } from "../DataSource";
import { Router } from "express";

const router = Router();

const dataSource = AppDataSource;
const personController = new PersonController(dataSource);

router.post('/',(req, res) => personController.createPerson(req, res));
router.get('/',(req, res) => personController.getAllAdmins(req, res));
router.get('/',(req, res) => personController.getPersonByEmail(req, res));


export default router
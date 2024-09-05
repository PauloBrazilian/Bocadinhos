import { Router } from "express";
import { AppDataSource } from "../DataSource";
import EmailController from "../controller/EmailController";

const router = Router();
const dataSource = AppDataSource;
const emailController = new EmailController(dataSource);

router.post("/", (req, res) => emailController.sendEmail(req, res));

export default router;
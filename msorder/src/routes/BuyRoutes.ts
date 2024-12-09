import { Router } from "express";
import CartController from "../controller/CartController";

const router = Router();
const cartController = new CartController();

router.post("/", (req, res) => cartController );
router.post("/", (req, res) => cartController );
router.post("/", (req, res) => cartController );
router.post("/", (req, res) => cartController );

export default router;
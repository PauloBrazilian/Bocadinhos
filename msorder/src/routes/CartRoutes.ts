import { Router } from "express";
import CartController from "../controller/CartController";

const router = Router();
const cartController = new CartController();

router.post("/", (req, res) => cartController.createCart(req, res));
router.get("/", (req, res) => cartController.findAllCarts(req, res));
router.get("/:id", (req, res) => cartController.findCartById(req, res));
router.put("/:id", (req, res) => cartController.updateCart(req, res));
router.delete("/:id", (req, res) => cartController.deleteCart(req, res));

export default router;

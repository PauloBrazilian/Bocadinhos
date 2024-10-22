import { Router } from "express";
import HistoryController from "../controller/HistoryController";

const router = Router();
const historyController = new HistoryController();

router.post("/", (req, res) => historyController.createHistory(req, res));
router.get("/", (req, res) => historyController.findAllHistories(req, res));
router.get("/{id}", (req, res) => historyController.findHistoryById(req, res));
router.put("/{id}", (req, res) => historyController.updateHistory(req, res));
router.delete("/{id}", (req, res) => historyController.deleteHistory(req, res));

export default router;
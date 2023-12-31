"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controller = require("../controllers/controllerTransaction");
router.get("/", controller.getAllTransactions);
router.get("/:id", controller.getTransactionbyId);
router.get("/user/:id", controller.getTransactionbyUserId);
router.post("/", controller.createTransaction);
router.post("/webhook", controller.updateTransaction);
router.put("/:id", controller.cancelTransaction);
router.delete("/:id", controller.deleteTransaction);
module.exports = router;

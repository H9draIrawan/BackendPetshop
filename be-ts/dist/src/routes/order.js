"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controller = require("../controllers/controllerOrder");
router.get("/", controller.getAllOrders);
router.get("/:id", controller.getOrderbyId);
router.get("/user/:id", controller.getOrderbyUserId);
router.post("/", controller.createOrder);
router.put("/:id", controller.updateOrder);
router.put("/review/:id", controller.reviewOrder);
router.put("/finish/:id", controller.finishOrder);
router.delete("/:id", controller.deleteOrder);
module.exports = router;

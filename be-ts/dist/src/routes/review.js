"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controller = require("../controllers/controllerReview");
router.get("/", controller.getAllReviews);
router.get("/:id", controller.getReviewbyId);
router.get("/user/:id", controller.getReviewbyUserId);
router.post("/", controller.createReview);
router.put("/:id", controller.updateReview);
router.delete("/:id", controller.deleteReview);
module.exports = router;

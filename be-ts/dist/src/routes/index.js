"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Routers
const admin = require("./admin");
const user = require("./user");
const pet = require("./pet");
const order = require("./order");
const review = require("./review");
const router = express_1.default.Router();
router.use("/admin", admin);
router.use("/user", user);
router.use("/pet", pet);
router.use("/order", order);
router.use("/review", review);
exports.default = router;

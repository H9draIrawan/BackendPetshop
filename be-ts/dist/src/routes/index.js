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
const router = express_1.default.Router();
router.use("/admin", admin);
router.use("/user", user);
router.use("/pet", pet);
exports.default = router;

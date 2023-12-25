"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controller = require("../controllers/controllerPet");
router.get("/", controller.getAllPets);
router.get("/:id", controller.getPetbyId);
router.get("/user/:id", controller.getPetbyUserId);
router.post("/:id", controller.createPet);
router.put("/:id", controller.updatePet);
router.delete("/:id", controller.deletePet);
module.exports = router;

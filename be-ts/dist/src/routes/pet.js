"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
const controller = require("../controllers/controllerPet");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "assets");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path_1.default.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });
router.get("/", controller.getAllPets);
router.get("/:id", controller.getPetbyId);
router.get("/user/:id", controller.getPetbyUserId);
router.post("/", upload.single("profile"), controller.createPet);
router.put("/:id", upload.single("profile"), controller.updatePet);
router.delete("/:id", controller.deletePet);
module.exports = router;

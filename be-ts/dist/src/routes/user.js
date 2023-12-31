"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
const controller = require("../controllers/controllerUser");
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
router.get("/", controller.getAllUsers);
router.get("/:id", controller.getUserbyId);
router.post("/login", controller.loginUser);
router.post("/register", controller.registerUser);
router.post("/token", controller.createToken);
router.post("/verify", controller.verifyUser);
router.put("/banned/:id", controller.bannedUser);
router.put("/:id", upload.single("profile"), controller.updateUser);
router.delete("/:id", controller.deleteUser);
module.exports = router;

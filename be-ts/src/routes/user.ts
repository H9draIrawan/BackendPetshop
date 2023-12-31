import express, { Router, Request, Response } from "express";
import path from "path";

const router: Router = express.Router();
const controller = require("../controllers/controllerUser");
const multer = require("multer");

const storage = multer.diskStorage({
	destination: function (req: any, file: any, cb: any) {
		cb(null, "assets");
	},
	filename: function (req: any, file: any, cb: any) {
		const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
		cb(null, uniqueSuffix + path.extname(file.originalname));
	},
});

const upload = multer({ storage: storage });

router.get("/", controller.getAllUsers);
router.get("/:id", controller.getUserbyId);
router.post("/login", controller.loginUser);
router.post("/register", controller.registerUser);
router.post("/token", controller.createToken);
router.post("/verify", controller.verifyUser);
router.put("/:id", upload.single("profile"), controller.updateUser);
router.delete("/:id", controller.deleteUser);

module.exports = router;

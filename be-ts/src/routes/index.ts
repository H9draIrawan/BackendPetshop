import express, {Router} from "express";
// Routers
const admin = require("./admin");
const user = require("./user");
const pet = require("./pet");

const router: Router = express.Router();

router.use("/admin", admin);
router.use("/user", user);
router.use("/pet", pet);

export default router;
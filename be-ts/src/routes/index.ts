import express, {Router} from "express";
// Routers
const admin = require("./admin");
const user = require("./user");
const pet = require("./pet");
const order = require("./order");
const review = require("./review");

const router: Router = express.Router();

router.use("/admin", admin);
router.use("/user", user);
router.use("/pet", pet);
router.use("/order", order);
router.use("/review", review);

export default router;
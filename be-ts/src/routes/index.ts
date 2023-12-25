import express, {Router} from "express";
// Routers
const admin = require("./admin");
const user = require("./user");

const router: Router = express.Router();

router.use("/admin", admin);
router.use("/user", user);

export default router;
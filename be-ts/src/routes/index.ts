import express, {Router} from "express";
// Routers
const admin = require("./admin");

const router: Router = express.Router();

router.use("/admin", admin);

export default router;
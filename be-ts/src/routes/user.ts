import express, { Router, Request, Response } from "express";

const router: Router = express.Router();
const controller = require("../controllers/controllerUser");

router.get("/", controller.getAllUsers);
router.get("/:id", controller.getUserbyId);
router.post("/", controller.createUser);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);




module.exports = router;

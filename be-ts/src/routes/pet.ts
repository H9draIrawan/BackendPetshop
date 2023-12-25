import express, { Router, Request, Response } from "express";

const router: Router = express.Router();
const controller = require("../controllers/controllerPet");

router.get("/", controller.getAllPets);
router.get("/:id", controller.getPetbyId);
router.get("/user/:id", controller.getPetbyUserId);
router.post("/", controller.createPet);
router.put("/:id", controller.updatePet);
router.delete("/:id", controller.deletePet);

module.exports = router;

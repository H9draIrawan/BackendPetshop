import express, {Router, Request, Response} from "express";

const admin: Router = express.Router();

admin.get('/', (req: Request, res: Response) => {
    res.send("admin API")
})

module.exports = admin;
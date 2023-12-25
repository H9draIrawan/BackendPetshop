import express, { Express } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routes from "./src/routes/index";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", optionsSuccessStatus: 200 }));

app.use("/api", routes);

app.listen(port, () => {
	mongoose.connect("mongodb://localhost:27017/PetShop").then(() => {
		console.log("Database connected");
		console.log(`[server]: Server is running at http://localhost:${port}`);
	});
});

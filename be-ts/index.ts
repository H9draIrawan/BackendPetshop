import express, { Express } from "express";
import mongoose from "mongoose";
import routes from "./src/routes/index";

require("dotenv").config();

const app: Express = express();
const port = process.env.PORT;
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173",optionsSuccessStatus: 200 }));
app.use("/static", express.static("assets"));
app.use("/api", routes);

app.listen(port, () => {
	mongoose.connect("mongodb://127.0.0.1/PetShop").then(() => {
		console.log("Database connected");
		console.log(`[server]: Server is running at http://localhost:${port}`);
	});
});

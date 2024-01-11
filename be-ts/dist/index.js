"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./src/routes/index"));
require("dotenv").config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const cors = require("cors");
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", optionsSuccessStatus: 200 }));
app.use("/static", express_1.default.static("assets"));
app.use("/api", index_1.default);
app.listen(port, () => {
    mongoose_1.default.connect("mongodb://127.0.0.1/PetShop").then(() => {
        console.log("Database connected");
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
});

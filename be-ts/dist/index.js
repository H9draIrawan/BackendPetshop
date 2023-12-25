"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./src/routes/index"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const cors = require("cors");
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", optionsSuccessStatus: 200 }));
app.use("/api", index_1.default);
app.listen(port, () => {
    mongoose_1.default.connect("mongodb://localhost:27017/PetShop").then(() => {
        console.log("Database connected");
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
});

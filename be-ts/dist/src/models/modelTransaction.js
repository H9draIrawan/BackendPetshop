"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const transactionSchema = new mongoose_1.default.Schema({
    id_user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "users",
    },
    id_order: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "orders",
    },
    id_invoice: String,
    harga: Number,
    status: String,
    created: Date,
    updated: Date,
});
const Transaction = mongoose_1.default.model("Transaction", transactionSchema, "transactions");
module.exports = Transaction;

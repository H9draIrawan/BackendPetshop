"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    id_user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "users",
    },
    details: [
        {
            _id: false,
            id_pet: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "pets",
            },
            kategori: String,
            harga: Number,
        },
    ],
    tanggal: Date,
    status: Boolean,
});
const Order = mongoose_1.default.model("Order", orderSchema, "orders");
module.exports = Order;

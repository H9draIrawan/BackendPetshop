"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reviewSchema = new mongoose_1.default.Schema({
    id_user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "users",
    },
    id_order: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "orders",
    },
    rating: Number,
    kritik: String,
    saran: String,
});
const Review = mongoose_1.default.model("Review", reviewSchema, "reviews");
module.exports = Review;

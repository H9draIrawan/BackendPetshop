"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    nama: String,
    username: String,
    email: String,
    password: String,
    profile: String,
    alamat: String,
    kota: String,
    no_hp: String,
    status: {
        type: String,
        default: "nonactive",
    },
});
const User = mongoose_1.default.model("User", userSchema, "users");
module.exports = User;

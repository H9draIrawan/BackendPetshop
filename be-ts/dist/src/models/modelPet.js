"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const petSchema = new mongoose_1.default.Schema({
    id_user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "users",
    },
    profile: String,
    nama: String,
    umur: String,
    jenis: String,
    ras: String,
});
const Pet = mongoose_1.default.model("Pet", petSchema, "pets");
module.exports = Pet;

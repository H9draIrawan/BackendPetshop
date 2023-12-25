"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Pet = require("../models/modelPet");
const getAllPets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pets = yield Pet.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "id_user",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $project: {
                    _id: 1,
                    profile: 1,
                    nama: 1,
                    umur: 1,
                    jenis: 1,
                    ras: 1,
                    user: {
                        $arrayElemAt: ["$user", 0],
                    },
                },
            },
        ]);
        return res.status(200).json(pets);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const getPetbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const pet = yield Pet.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "id_user",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $match: {
                    _id: new mongoose_1.default.Types.ObjectId(id),
                },
            },
            {
                $project: {
                    _id: 1,
                    profile: 1,
                    nama: 1,
                    umur: 1,
                    jenis: 1,
                    ras: 1,
                    user: {
                        $arrayElemAt: ["$user", 0],
                    },
                },
            },
        ]);
        return res.status(200).json(pet);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const getPetbyUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const pet = yield Pet.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "id_user",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $match: {
                    id_user: new mongoose_1.default.Types.ObjectId(id),
                },
            },
            {
                $project: {
                    _id: 1,
                    profile: 1,
                    nama: 1,
                    umur: 1,
                    jenis: 1,
                    ras: 1,
                    user: {
                        $arrayElemAt: ["$user", 0],
                    },
                },
            },
        ]);
        return res.status(200).json(pet);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const createPet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_user, profile, nama, umur, jenis, ras } = req.body;
        const newPet = Pet.create({
            id_user: id_user,
            profile: profile,
            nama: nama,
            umur: umur,
            jenis: jenis,
            ras: ras,
        });
        return res.status(200).json({ message: "Pet created" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const updatePet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { profile, nama, umur, jenis, ras } = req.body;
        const { id } = req.params;
        const newPet = yield Pet.findByIdAndUpdate(id, {
            profile: profile,
            nama: nama,
            umur: umur,
            jenis: jenis,
            ras: ras,
        }, { new: true });
        return res.status(200).json(newPet);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const deletePet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield Pet.findByIdAndDelete(id);
        return res.status(200).json({ message: "Pet deleted" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
module.exports = {
    getAllPets,
    getPetbyId,
    getPetbyUserId,
    createPet,
    updatePet,
    deletePet,
};

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
const Order = require("../models/modelOrder");
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "id_user",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $lookup: {
                    from: "pets",
                    localField: "id_pet",
                    foreignField: "_id",
                    as: "pet",
                },
            },
            {
                $project: {
                    _id: 1,
                    kategori: 1,
                    harga: 1,
                    tanggal: 1,
                    user: {
                        $arrayElemAt: ["$user", 0],
                    },
                    pet: {
                        $arrayElemAt: ["$pet", 0],
                    },
                },
            },
        ]);
        return res.status(200).json(orders);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const getOrderbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const order = yield Order.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "id_user",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $lookup: {
                    from: "pets",
                    localField: "id_pet",
                    foreignField: "_id",
                    as: "pet",
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
                    kategori: 1,
                    harga: 1,
                    tanggal: 1,
                    user: {
                        $arrayElemAt: ["$user", 0],
                    },
                    pet: {
                        $arrayElemAt: ["$pet", 0],
                    },
                },
            },
        ]);
        return res.status(200).json(order);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const getOrderbyUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const order = yield Order.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "id_user",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $lookup: {
                    from: "pets",
                    localField: "id_pet",
                    foreignField: "_id",
                    as: "pet",
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
                    kategori: 1,
                    harga: 1,
                    tanggal: 1,
                    user: {
                        $arrayElemAt: ["$user", 0],
                    },
                    pet: {
                        $arrayElemAt: ["$pet", 0],
                    },
                },
            },
        ]);
        return res.status(200).json(order);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_user, id_pet, kategori, harga, tanggal } = req.body;
        const newOrder = Order.create({
            id_user: id_user,
            id_pet: id_pet,
            kategori: kategori,
            harga: harga,
            tanggal: tanggal,
        });
        return res.status(200).json({ message: "Order created" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { kategori, harga, tanggal } = req.body;
        const { id } = req.params;
        const newOrder = yield Order.findByIdAndUpdate(id, {
            kategori: kategori,
            harga: harga,
            tanggal: tanggal,
        }, { new: true });
        return res.status(200).json(newOrder);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield Order.findByIdAndDelete(id);
        return res.status(200).json({ message: "Order deleted" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
module.exports = {
    getAllOrders,
    getOrderbyId,
    getOrderbyUserId,
    createOrder,
    updateOrder,
    deleteOrder,
};

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
                    localField: "details.id_pet",
                    foreignField: "_id",
                    as: "pets",
                },
            },
            {
                $project: {
                    _id: 1,
                    status: 1,
                    details: 1,
                    tanggal: 1,
                    pets: 1,
                    review: 1,
                    user: {
                        $arrayElemAt: ["$user", 0],
                    },
                    total: { $sum: "$details.harga" },
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
                $match: {
                    _id: new mongoose_1.default.Types.ObjectId(id),
                },
            },
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
                    localField: "details.id_pet",
                    foreignField: "_id",
                    as: "pets",
                },
            },
            {
                $project: {
                    _id: 1,
                    status: 1,
                    details: 1,
                    tanggal: 1,
                    pets: 1,
                    review: 1,
                    user: {
                        $arrayElemAt: ["$user", 0],
                    },
                    total: { $sum: "$details.harga" },
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
                $match: {
                    id_user: new mongoose_1.default.Types.ObjectId(id),
                },
            },
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
                    localField: "details.id_pet",
                    foreignField: "_id",
                    as: "pets",
                },
            },
            {
                $project: {
                    _id: 1,
                    status: 1,
                    details: 1,
                    tanggal: 1,
                    pets: 1,
                    review: 1,
                    user: {
                        $arrayElemAt: ["$user", 0],
                    },
                    total: { $sum: "$details.harga" },
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
        const { id_user, details, tanggal } = req.body;
        Order.create({
            id_user: id_user,
            details: details,
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
        const { details, tanggal } = req.body;
        const { id } = req.params;
        const newOrder = yield Order.findByIdAndUpdate(id, {
            details: details,
            tanggal: tanggal,
        }, { new: true });
        return res.status(200).json(newOrder);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const reviewOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const newOrder = yield Order.findByIdAndUpdate(id, {
            review: true,
        }, { new: true });
        return res.status(200).json(newOrder);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const finishOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const newOrder = yield Order.findByIdAndUpdate(id, {
            status: true,
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
    reviewOrder,
    finishOrder,
    deleteOrder,
};

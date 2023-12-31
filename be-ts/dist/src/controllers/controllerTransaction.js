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
const axios_1 = __importDefault(require("axios"));
const dotenv = require("dotenv").config();
const API_KEY = Buffer.from(`${process.env.API_KEY}:`).toString("base64");
const Transaction = require("../models/modelTransaction");
const getAllTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield Transaction.aggregate([
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
                    from: "orders",
                    localField: "id_order",
                    foreignField: "_id",
                    as: "order",
                },
            },
            {
                $project: {
                    _id: 1,
                    id_invoice: 1,
                    harga: 1,
                    status: 1,
                    created: 1,
                    updated: 1,
                    user: {
                        $arrayElemAt: ["$user", 0],
                    },
                    order: {
                        $arrayElemAt: ["$order", 0],
                    },
                },
            },
        ]);
        return res.status(200).json(transactions);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const getTransactionbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const transaction = yield Transaction.aggregate([
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
                    from: "orders",
                    localField: "id_order",
                    foreignField: "_id",
                    as: "order",
                },
            },
            {
                $project: {
                    _id: 1,
                    id_invoice: 1,
                    harga: 1,
                    status: 1,
                    created: 1,
                    updated: 1,
                    user: {
                        $arrayElemAt: ["$user", 0],
                    },
                    order: {
                        $arrayElemAt: ["$order", 0],
                    },
                },
            },
        ]);
        return res.status(200).json(transaction);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const getTransactionbyUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const transaction = yield Transaction.aggregate([
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
                    from: "orders",
                    localField: "id_order",
                    foreignField: "_id",
                    as: "order",
                },
            },
            {
                $project: {
                    _id: 1,
                    id_invoice: 1,
                    harga: 1,
                    status: 1,
                    created: 1,
                    updated: 1,
                    user: {
                        $arrayElemAt: ["$user", 0],
                    },
                    order: {
                        $arrayElemAt: ["$order", 0],
                    },
                },
            },
        ]);
        return res.status(200).json(transaction);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const createTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_user, id_order, nama, username, email, no_hp, harga, tanggal } = req.body;
        const { data } = yield axios_1.default.post(`https://api.xendit.co/v2/invoices`, {
            external_id: `invoice-${Math.random().toString(36).split(".")[1]}`,
            amount: harga,
            invoice_duration: 86400,
            customer: {
                given_names: nama,
                surname: username,
                email: email,
                mobile_number: no_hp,
            },
            customer_notification_preference: {
                invoice_created: ["whatsapp", "sms", "email"],
                invoice_reminder: ["whatsapp", "sms", "email"],
                invoice_paid: ["whatsapp", "sms", "email"],
                invoice_expired: ["whatsapp", "sms", "email"],
            },
            currency: "IDR",
        }, {
            headers: {
                Authorization: `Basic ${API_KEY}`,
            },
        });
        Transaction.create({
            id_user: id_user,
            id_order: id_order,
            id_invoice: data.id,
            harga: harga,
            status: data.status,
            created: tanggal,
            updated: tanggal,
        });
        return res.status(200).json({ message: "Transaction created" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const updateTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, status, updated } = req.body;
        yield Transaction.find({ id_invoice: id }).updateOne({
            status: status,
            updated: updated,
        });
        return res.status(200).json({ message: "Transaction updated" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const cancelTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield axios_1.default.post(`https://api.xendit.co/invoices/${id}/expire!`, {}, {
            headers: {
                Authorization: `Basic ${API_KEY}`,
            },
        });
        return res.status(200).json({ message: "Transaction canceled" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const deleteTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield Transaction.findByIdAndDelete(id);
        return res.status(200).json({ message: "Transaction deleted" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
module.exports = {
    getAllTransactions,
    getTransactionbyId,
    getTransactionbyUserId,
    createTransaction,
    updateTransaction,
    cancelTransaction,
    deleteTransaction,
};

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
const Review = require("../models/modelReview");
const getAllReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield Review.aggregate([
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
                    rating: 1,
                    kritik: 1,
                    saran: 1,
                    user: {
                        $arrayElemAt: ["$user", 0],
                    },
                    order: {
                        $arrayElemAt: ["$order", 0],
                    },
                },
            },
        ]);
        return res.status(200).json(reviews);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const getReviewbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const review = yield Review.aggregate([
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
                    rating: 1,
                    kritik: 1,
                    saran: 1,
                    user: {
                        $arrayElemAt: ["$user", 0],
                    },
                    order: {
                        $arrayElemAt: ["$order", 0],
                    },
                },
            },
        ]);
        return res.status(200).json(review);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const getReviewbyUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const review = yield Review.aggregate([
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
                    rating: 1,
                    kritik: 1,
                    saran: 1,
                    user: {
                        $arrayElemAt: ["$user", 0],
                    },
                    order: {
                        $arrayElemAt: ["$order", 0],
                    },
                },
            },
        ]);
        return res.status(200).json(review);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_user, id_order, rating, kritik, saran } = req.body;
        Review.create({
            id_user: id_user,
            id_order: id_order,
            rating: rating,
            kritik: kritik,
            saran: saran,
        });
        return res.status(200).json({ message: "Review created" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const updateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rating, kritik, saran } = req.body;
        const { id } = req.params;
        const newReview = yield Review.findByIdAndUpdate(id, {
            rating: rating,
            kritik: kritik,
            saran: saran,
        }, { new: true });
        return res.status(200).json(newReview);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield Review.findByIdAndDelete(id);
        return res.status(200).json({ message: "Review deleted" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
module.exports = {
    getAllReviews,
    getReviewbyId,
    getReviewbyUserId,
    createReview,
    updateReview,
    deleteReview,
};

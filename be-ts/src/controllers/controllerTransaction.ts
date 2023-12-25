import { Request, Response } from "express";
import mongoose from "mongoose";
import axios from "axios";

const dotenv = require("dotenv").config();
const Transaction = require("../models/modelTransaction");
const Token = process.env.API_KEY;

const getAllTransactions = async (req: Request, res: Response) => {
	try {
		const transactions = await Transaction.aggregate([
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
					harga: 1,
					tanggal: 1,
					status: 1,
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
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

const getTransactionbyId = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const transaction = await Transaction.aggregate([
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
				$match: {
					_id: new mongoose.Types.ObjectId(id),
				},
			},
			{
				$project: {
					_id: 1,
					harga: 1,
					tanggal: 1,
					status: 1,
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
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

const getTransactionbyUserId = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const transaction = await Transaction.aggregate([
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
				$match: {
					id_user: new mongoose.Types.ObjectId(id),
				},
			},
			{
				$project: {
					_id: 1,
					harga: 1,
					tanggal: 1,
					status: 1,
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
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

const createTransaction = async (req: Request, res: Response) => {
	try {
		const { id_user, id_order, harga, tanggal } = req.body;
		const newTransaction = Transaction.create({
			id_user: id_user,
			id_order: id_order,
			harga: harga,
			tanggal: tanggal,
			status: false,
		});

		return res.status(200).json({ message: "Transaction created" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

const updateTransaction = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const newTransaction = await Transaction.findByIdAndUpdate(
			id,
			{
				status: true,
			},
			{ new: true },
		);

		return res.status(200).json(newTransaction);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

const deleteTransaction = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await Transaction.findByIdAndDelete(id);
		return res.status(200).json({ message: "Transaction deleted" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

module.exports = {
	getAllTransactions,
	getTransactionbyId,
	getTransactionbyUserId,
	createTransaction,
	updateTransaction,
	deleteTransaction,
};

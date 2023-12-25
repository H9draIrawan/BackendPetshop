import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
	id_user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
	},
	id_order: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "orders",
	},
	harga: Number,
	tanggal: Date,
	status: Boolean,
});

const Transaction = mongoose.model("Transaction", transactionSchema, "transactions");
module.exports = Transaction;

import { Request, Response } from "express";
const User = require("../models/modelUser");

const getAllUsers = async (req: Request, res: Response) => {
	try {
		const users = await User.find();
		return res.status(200).json(users);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

const getUserbyId = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);
		return res.status(200).json(user);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

const createUser = async (req: Request, res: Response) => {
	try {
		const { nama, username, email, password, profile, alamat, kota, no_hp } =
			req.body;
		const newUser = User.create({
			nama: nama,
			username: username,
			email: email,
			password: password,
			profile: profile,
			alamat: alamat,
			kota: kota,
			no_hp: no_hp,
			status: false,
		});
		return res.status(200).json(newUser);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

const updateUser = async (req: Request, res: Response) => {
	try {
		const { nama, username, email, password, profile, alamat, kota, no_hp } =
			req.body;
		const { id } = req.params;

		const newUser = await User.findByIdAndUpdate(
			id,
			{
				nama: nama,
				username: username,
				email: email,
				password: password,
				profile: profile,
				alamat: alamat,
				kota: kota,
				no_hp: no_hp,
			},
			{ new: true },
		);

		return res.status(200).json(newUser);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

const deleteUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await User.findByIdAndDelete(id);
		return res.status(200).json({ message: "User deleted" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

module.exports = {
	getAllUsers,
	getUserbyId,
	createUser,
	updateUser,
	deleteUser,
};

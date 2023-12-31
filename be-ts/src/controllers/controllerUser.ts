import { Request, Response } from "express";
const User = require("../models/modelUser");
const dotenv = require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

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

const loginUser = async (req: Request, res: Response) => {
	try {
		const { email, username, password } = req.body;
		const user = await User.findOne({
			$or: [{ email: email }, { username: username }],
		});
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		const isMatch = bcrypt.compareSync(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Wrong password" });
		}
		if (!user.status) {
			return res.status(400).json({ message: "User not verified" });
		}
		return res.status(200).json({ message: "Login successful" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

const registerUser = async (req: Request, res: Response) => {
	try {
		const { nama, username, email, password, alamat, kota, no_hp } = req.body;
		User.create({
			nama: nama,
			username: username,
			email: email,
			password: bcrypt.hashSync(password, 10),
			profile: "default.png",
			alamat: alamat,
			kota: kota,
			no_hp: no_hp,
			status: false,
		});

		const token = jwt.sign(
			{
				email: email,
			},
			process.env.SECRET_KEY,
			{
				expiresIn: 120,
			},
		);

		sendEmail(email, "Verify your account", token);
		return res.status(200).json({ message: "User created" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

const verifyUser = async (req: Request, res: Response) => {
	const { token } = req.body;
	try {
		const user = jwt.verify(token, process.env.SECRET_KEY);
		await User.findOneAndUpdate({ email: user.email }, { status: true });
		return res.status(200).json({ message: "User verified" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

const updateUser = async (req: any, res: Response) => {
	try {
		const { nama, username, email, password, alamat, kota, no_hp } = req.body;
		const { id } = req.params;
		if (password) {
			const newUser = await User.findByIdAndUpdate(
				id,
				{
					nama: nama,
					username: username,
					email: email,
					password: bcrypt.hashSync(password, 10),
					profile: req.file.filename,
					alamat: alamat,
					kota: kota,
					no_hp: no_hp,
				},
				{ new: true },
			);
			return res.status(200).json(newUser);
		} else {
			const newUser = await User.findByIdAndUpdate(
				id,
				{
					nama: nama,
					username: username,
					email: email,
					profile: req.file.filename,
					alamat: alamat,
					kota: kota,
					no_hp: no_hp,
				},
				{ new: true },
			);
			return res.status(200).json(newUser);
		}
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

const createToken = (req: Request, res: Response) => {
	const { email } = req.body;
	const token = jwt.sign(
		{
			email: email,
		},
		process.env.SECRET_KEY,
		{
			expiresIn: 120,
		},
	);
	sendEmail(req.body.email, "Verify your account", token);
	return res.status(200).json({ message: "Token created" });
};

const sendEmail = async (email: String, subject: String, text: String) => {
	try {
		const transporter = nodemailer.createTransport({
			service: "Gmail",
			auth: {
				user: process.env.EMAIL,
				pass: process.env.PASSWORD,
			},
		});

		const mailOptions = {
			from: process.env.EMAIL,
			to: email,
			subject: subject,
			text: text,
		};

		await transporter.sendMail(mailOptions);
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	getAllUsers,
	getUserbyId,
	loginUser,
	registerUser,
	createToken,
	verifyUser,
	updateUser,
	deleteUser,
};

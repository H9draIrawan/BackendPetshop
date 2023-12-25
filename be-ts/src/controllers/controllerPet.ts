import { Request, Response } from "express";
import mongoose from "mongoose";
const Pet = require("../models/modelPet");

const getAllPets = async (req: Request, res: Response) => {
	try {
		const pets = await Pet.aggregate([
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
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

const getPetbyId = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const pet = await Pet.aggregate([
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
					_id: new mongoose.Types.ObjectId(id),
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
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

const getPetbyUserId = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const pet = await Pet.aggregate([
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
					id_user: new mongoose.Types.ObjectId(id),
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
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

const createPet = async (req: Request, res: Response) => {
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
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

const updatePet = async (req: Request, res: Response) => {
	try {
		const { profile, nama, umur, jenis, ras } = req.body;
		const { id } = req.params;

		const newPet = await Pet.findByIdAndUpdate(
			id,
			{
				profile: profile,
				nama: nama,
				umur: umur,
				jenis: jenis,
				ras: ras,
			},
			{ new: true },
		);

		return res.status(200).json(newPet);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

const deletePet = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await Pet.findByIdAndDelete(id);
		return res.status(200).json({ message: "Pet deleted" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

module.exports = {
	getAllPets,
	getPetbyId,
	getPetbyUserId,
	createPet,
	updatePet,
	deletePet,
};

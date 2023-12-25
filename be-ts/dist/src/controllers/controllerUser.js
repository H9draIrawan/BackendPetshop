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
Object.defineProperty(exports, "__esModule", { value: true });
const User = require("../models/modelUser");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.find();
        return res.status(200).json(users);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const getUserbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield User.findById(id);
        return res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nama, username, email, password, profile, alamat, kota, no_hp } = req.body;
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
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nama, username, email, password, profile, alamat, kota, no_hp } = req.body;
        const { id } = req.params;
        const newUser = yield User.findByIdAndUpdate(id, {
            nama: nama,
            username: username,
            email: email,
            password: password,
            profile: profile,
            alamat: alamat,
            kota: kota,
            no_hp: no_hp,
        }, { new: true });
        return res.status(200).json(newUser);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield User.findByIdAndDelete(id);
        return res.status(200).json({ message: "User deleted" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
module.exports = {
    getAllUsers,
    getUserbyId,
    createUser,
    updateUser,
    deleteUser,
};

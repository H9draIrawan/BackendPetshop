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
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
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
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, username, password } = req.body;
        const user = yield User.findOne({
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
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const token = jwt.sign({
            email: email,
        }, process.env.SECRET_KEY, {
            expiresIn: 120,
        });
        sendEmail(email, "Verify your account", token);
        return res.status(200).json({ message: "User created" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        yield User.findOneAndUpdate({ email: user.email }, { status: true });
        return res.status(200).json({ message: "User verified" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nama, username, email, password, alamat, kota, no_hp } = req.body;
        const { id } = req.params;
        if (password) {
            const newUser = yield User.findByIdAndUpdate(id, {
                nama: nama,
                username: username,
                email: email,
                password: bcrypt.hashSync(password, 10),
                profile: req.file.filename,
                alamat: alamat,
                kota: kota,
                no_hp: no_hp,
            }, { new: true });
            return res.status(200).json(newUser);
        }
        else {
            const newUser = yield User.findByIdAndUpdate(id, {
                nama: nama,
                username: username,
                email: email,
                profile: req.file.filename,
                alamat: alamat,
                kota: kota,
                no_hp: no_hp,
            }, { new: true });
            return res.status(200).json(newUser);
        }
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
const createToken = (req, res) => {
    const { email } = req.body;
    const token = jwt.sign({
        email: email,
    }, process.env.SECRET_KEY, {
        expiresIn: 120,
    });
    sendEmail(req.body.email, "Verify your account", token);
    return res.status(200).json({ message: "Token created" });
};
const sendEmail = (email, subject, text) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield transporter.sendMail(mailOptions);
    }
    catch (error) {
        console.log(error);
    }
});
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

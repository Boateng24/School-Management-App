"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.forgotPassword = exports.deleteUser = exports.updateUser = exports.findUsers = exports.getUser = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const prismaInit_1 = require("../config/prismaInit");
const accessToken_1 = require("../helpers/accessToken");
const dotenv_1 = require("dotenv");
const nodemailer = __importStar(require("nodemailer"));
(0, dotenv_1.config)();
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findUser = yield prismaInit_1.prisma.user.findFirst({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ findUser, success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.getUser = getUser;
// Get all users
const findUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getUsers = yield prismaInit_1.prisma.user.findMany({
            select: {
                id: true,
                firstname: true,
                email: true,
                role: true
            }
        });
        res.json({ getUsers, success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.findUsers = findUsers;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname, email, age } = req.body;
        const userExits = yield prismaInit_1.prisma.user.findFirst({
            where: {
                id: req.params.id
            }
        });
        if (!userExits)
            throw new http_errors_1.default.NotFound("User not found");
        const userUpdate = yield prismaInit_1.prisma.user.update({
            where: {
                id: req.params.id
            },
            data: {
                firstname,
                email,
                age
            }
        });
        res.status(200).json({ userUpdate, success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = updateUser;
// Delete a user
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userDelete = yield prismaInit_1.prisma.user.delete({
            where: {
                id: req.params.id
            }
        });
        res.json({ success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUser = deleteUser;
// Forgot password
const forgotPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const userId = req["payload"].id;
        console.log(userId);
        const currentUser = yield prismaInit_1.prisma.user.findFirst({
            where: {
                id: userId
            }
        });
        console.log(currentUser.id);
        if (!currentUser)
            throw new http_errors_1.default.NotFound("user not found");
        const token = yield (0, accessToken_1.createAccessToken)(currentUser.id);
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: "tuffourboateng2@gmail.com",
                pass: "fiqwmlszdtfywrjw"
            }
        });
        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
            }
            else {
                console.log("Server is ready to take our messages");
            }
        });
        const mailDetails = {
            from: "tuffourboateng2@gmail.com",
            to: email,
            subject: "Password reset link",
            html: `<a href="/forgotPassword/" + ${currentUser.id} + '/' + ${token}>click this link to confirm password reset</a>`
        };
        transporter.sendMail(mailDetails, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("email sent successfully");
            }
        });
        yield prismaInit_1.prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                password
            }
        });
        res.json({ success: true });
    }
    catch (error) {
        next(error.message);
    }
});
exports.forgotPassword = forgotPassword;
//# sourceMappingURL=user.controller.js.map
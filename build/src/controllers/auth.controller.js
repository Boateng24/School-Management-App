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
exports.login = exports.signUp = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const prismaInit_1 = require("../config/prismaInit");
const accessToken_1 = require("../helpers/accessToken");
// import {registeruserService} from '../services/user.services'; will improve it later
const bcryptConfig_1 = require("../helpers/bcryptConfig");
const refreshToken_1 = require("../helpers/refreshToken");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const maxAge = 7 * 24 * 60 * 60 * 1000;
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { firstname, email, password, confirmPassword } = req.body;
        const userExists = yield prismaInit_1.prisma.user.findFirst({
            where: {
                email
            }
        });
        if (userExists)
            throw new http_errors_1.default.Conflict("User already exists");
        // check if password matches
        if (!(password.match(confirmPassword)))
            return res.json({ message: 'Passwords do not match' });
        const newUser = yield prismaInit_1.prisma.user.create({
            data: {
                firstname,
                email,
                password: yield (0, bcryptConfig_1.hashedPassword)(password),
                role: (_a = req.body) === null || _a === void 0 ? void 0 : _a.role,
                age: (_b = req.body) === null || _b === void 0 ? void 0 : _b.age
            }
        });
        const createdUser = newUser.id;
        res.json({ createdUser, success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.signUp = signUp;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const foundUser = yield prismaInit_1.prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!foundUser)
            throw new http_errors_1.default.ExpectationFailed("User not registered");
        const matchPassword = yield (0, bcryptConfig_1.compare)(password, foundUser === null || foundUser === void 0 ? void 0 : foundUser.password);
        if (!matchPassword)
            throw new http_errors_1.default.NotAcceptable("Invalid credentials");
        // create both acess and refresh token for current user
        const accessToken = yield (0, accessToken_1.createAccessToken)(foundUser.id);
        const refreshToken = yield (0, refreshToken_1.createRefreshToken)(foundUser.id);
        res.cookie('jwt-access', refreshToken, { httpOnly: true, sameSite: 'none', secure: true, maxAge });
        const loggedInUser = { id: foundUser.id, firstname: foundUser.firstname, email: foundUser.email, accessToken };
        res.status(200).json({ loggedInUser, success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
//# sourceMappingURL=auth.controller.js.map
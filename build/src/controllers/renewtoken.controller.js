"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renewAccessToken = exports.removeRefreshToken = exports.refreshTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const process_1 = require("process");
const accessToken_1 = require("../helpers/accessToken");
exports.refreshTokens = [];
const removeRefreshToken = (givenToken) => {
    exports.refreshTokens = exports.refreshTokens.filter((item) => {
        return item.refreshToken !== givenToken;
    });
};
exports.removeRefreshToken = removeRefreshToken;
const renewAccessToken = (req, res, next) => {
    try {
        const cookies = req.cookies;
        if (!cookies.jwt)
            return res.sendStatus(401); //no cookies or no jwt-cookies
        const refreshToken = cookies.jwt;
        let User;
        exports.refreshTokens.forEach((token) => {
            if (Object.values(token)[1] === refreshToken) {
                User = Object.values(token)[0];
            }
        });
        if (!User) {
            return res.status(403).json({ message: "Not authenticated" });
        }
        jsonwebtoken_1.default.verify(refreshToken, String(process_1.env.REFRESH_TOKEN_SECRET), (err, tokenRefresh) => {
            const actualId = tokenRefresh.id;
            if (!err) {
                const accessToken = jsonwebtoken_1.default.sign({ id: actualId }, String(process_1.env.ACCESS_TOKEN_SECRET), {
                    expiresIn: accessToken_1.maxAge,
                    issuer: 'RanchoRob.org'
                });
                res.status(201).json({ role: User.role, userId: User.id, firstname: User.firstname, accessToken });
            }
            else {
                res.status(403).json({ message: 'Not authenticated' });
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.renewAccessToken = renewAccessToken;
//# sourceMappingURL=renewtoken.controller.js.map
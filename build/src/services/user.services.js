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
exports.registeruserService = void 0;
const prismaInit_1 = require("../config/prismaInit");
const http_errors_1 = __importDefault(require("http-errors"));
const registeruserService = (email, password, confirmPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // check if user already exists
        const userExists = yield prismaInit_1.prisma.user.findFirst({
            where: {
                email: email
            }
        });
        if (userExists)
            throw new http_errors_1.default.Conflict("User already exists");
        if (password !== confirmPassword) { // check if password matches
            throw new http_errors_1.default.ExpectationFailed('Passwords do not match');
        }
    }
    catch (error) {
        (0, http_errors_1.default)(error.message);
    }
});
exports.registeruserService = registeruserService;
//# sourceMappingURL=user.services.js.map
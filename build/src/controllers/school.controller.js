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
exports.newSchool = void 0;
const prismaInit_1 = require("../config/prismaInit");
const newSchool = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { schoolName, email, password, confirmPassword } = req.body;
        const schoolExits = yield prismaInit_1.prisma.school.findUnique({
            where: {
                email
            }
        });
        if (schoolExits)
            return res.json({ message: `${schoolExits.schoolName} already exist` });
        if (!(password.match(confirmPassword)))
            return res.json({ message: 'Passwords do not match' });
        const createnewSchool = yield prismaInit_1.prisma.school.create({
            data: {
                schoolName,
                email,
                password
            }
        });
        res.json({ createnewSchool, success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.newSchool = newSchool;
//# sourceMappingURL=school.controller.js.map
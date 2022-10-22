"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const validators_1 = require("../middlewares/validators");
const authRouter = express_1.default.Router();
authRouter.post('/signup', validators_1.validatorSchema, validators_1.passwordValidator, auth_controller_1.signUp);
authRouter.post('/login', auth_controller_1.login);
exports.default = authRouter;
//# sourceMappingURL=auth.route.js.map
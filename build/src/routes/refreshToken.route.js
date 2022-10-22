"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const renewtoken_controller_1 = require("../controllers/renewtoken.controller");
const refreshRouter = express_1.default.Router();
refreshRouter.get('/refresh', renewtoken_controller_1.renewAccessToken);
exports.default = refreshRouter;
//# sourceMappingURL=refreshToken.route.js.map
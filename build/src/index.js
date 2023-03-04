"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const credentials_1 = require("./middlewares/credentials");
const cors_1 = __importDefault(require("cors"));
const corsOptions_1 = require("./helpers/corsOptions");
const dbConnection_1 = __importDefault(require("./config/dbConnection"));
const helmet_1 = __importDefault(require("helmet"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const users_route_1 = __importDefault(require("./routes/users.route"));
const refreshToken_route_1 = __importDefault(require("./routes/refreshToken.route"));
const school_route_1 = __importDefault(require("./routes/school.route"));
// Inititializing express app
const app = (0, express_1.default)();
// Configuring our environmental variables
(0, dotenv_1.config)();
const PORT = process.env.PORT_NUM;
// Db connection configuration
(0, dbConnection_1.default)();
// Global middlewares
app.use((0, helmet_1.default)());
app.use(credentials_1.credentials);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)(corsOptions_1.corsOptions));
// Routes
app.use('/api/v1', auth_route_1.default);
app.use('/api/v1', users_route_1.default);
app.use('/api/v1', refreshToken_route_1.default);
app.use('/api/v1', school_route_1.default);
app.listen(PORT || 5000, () => {
    console.log(`Server successfully listening on port ${PORT}`);
});
//# sourceMappingURL=index.js.map
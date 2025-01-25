"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const template_1 = __importDefault(require("./template"));
const connectToMongoDB_1 = __importDefault(require("./db/connectToMongoDB"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
dotenv_1.default.config();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, compression_1.default)());
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use('/api/v1', user_routes_1.default);
app.get('/', (request, respond) => {
    respond.status(200).send((0, template_1.default)());
});
app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }
    (0, connectToMongoDB_1.default)();
    console.log(`server is running on http://localhost:${PORT}`);
});

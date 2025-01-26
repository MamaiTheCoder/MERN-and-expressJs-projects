"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connectToMongoDB_1 = __importDefault(require("./db/connectToMongoDB"));
const createApp_1 = __importDefault(require("./createApp"));
const PORT = process.env.PORT || 5000;
const app = (0, createApp_1.default)();
// app.get('/', (request, respond) => {
//   respond.status(200).send(Template())
// });
app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }
    (0, connectToMongoDB_1.default)();
    console.log(`server is running on http://localhost:${PORT}`);
});

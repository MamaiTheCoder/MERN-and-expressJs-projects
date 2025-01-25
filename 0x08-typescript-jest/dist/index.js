"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateApp_1 = require("./CreateApp");
const app = (0, CreateApp_1.createApp)();
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:5000`);
});

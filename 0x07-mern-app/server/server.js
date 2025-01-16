import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import Template from "./template.js";

import userRoutes from "./routes/user.routes.js";

dotenv.config();

import connectMongoDB from "./db/connectMongoDB.js";


const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

app.use("/", userRoutes);

app.get("/", (req, res) => {
  res.status(200).send(Template());
});

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Server is running on http://localhost:${PORT}`);
    connectMongoDB();
});

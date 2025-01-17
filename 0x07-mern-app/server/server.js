import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import path from "path";

import Template from "./template.js";

import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

import connectMongoDB from "./db/connectMongoDB.js";


const app = express();
const PORT = process.env.PORT || 5000;
const CURRENT_WORING_DIR = process.cwd();


// middlewares
app.use(express.json()); // Ensure JSON body is parsed
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());
app.use('/dist', express.static(path.join(CURRENT_WORING_DIR, 'dist')));

app.use("/", userRoutes);
app.use("/", authRoutes);

app.get("/", (req, res) => {
  res.status(200).send(Template());
});

// express-jwt throws an error named UnauthorizedError
// when a token cannot be validated for some reason.
// We catch this error here to return a 401 status back to the
// requesting client
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: `${err.name}: ${err.message}` });
  } else if (err) {
    res.status(400).json({ error: `${err.name}: ${err.message}` });
    console.log(err);
  }
});

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Server is running on http://localhost:${PORT}`);
    connectMongoDB();
});

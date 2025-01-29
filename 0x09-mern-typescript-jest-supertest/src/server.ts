import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { Request, Response, NextFunction } from "express-serve-static-core";

import connectToMongoDB from "./db/connectToMongoDB";
import userRoute from "./routers/user.router";
import authRoute from "./routers/auth.router";
import { RequestCustom } from "./types/request";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

interface UnauthorizedError extends Error {
  name: "UnauthorizedError";
  message: string;
}

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.use("/api/v1", authRoute);
app.use("/api/v1", userRoute);

app.get("/", (request: Request, response: Response) => {});

app.use(
  (
    err: UnauthorizedError | Error, // Typecast `err` to either UnauthorizedError or generic Error
    req: RequestCustom,
    res: Response,
    next: NextFunction
  ) => {
    if ((err as UnauthorizedError).name === "UnauthorizedError") {
      res
        .status(401)
        .json({
          error: `${(err as UnauthorizedError).name}: ${
            (err as UnauthorizedError).message
          }`,
        });
    } else if (err) {
      res.status(400).json({ error: `${err.name}: ${err.message}` });
      console.log(err);
    }
  }
);

app.listen(PORT, () => {
  console.log(`server is run on http://localhost:${PORT}`);
  connectToMongoDB();
});

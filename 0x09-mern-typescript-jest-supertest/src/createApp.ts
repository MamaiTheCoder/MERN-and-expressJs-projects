import express from "express";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import dotEnv from "dotenv";

import Template from './template'

import userRoutes from "./routes/user.routes";

dotEnv.config();

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());
  app.use(compress());
  app.use(helmet());
  app.use(cors());
  app.use("/api/v1", userRoutes);
  return app;
};

export default createApp;

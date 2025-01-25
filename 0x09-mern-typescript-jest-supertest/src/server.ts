import express from "express";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import dotEnv from "dotenv";

import userRoutes from './routes/user.routes';

import Template from './template'
import connectMongoDB from "./db/connectToMongoDB";

const app = express();
const PORT = process.env.PORT || 5000;

dotEnv.config();

app.use(express.json());
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

app.use('/api/v1', userRoutes);

app.get('/', (request, respond) => {
  respond.status(200).send(Template())
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  connectMongoDB();
  console.log(`server is running on http://localhost:${PORT}`);
});

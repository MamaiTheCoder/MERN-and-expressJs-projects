import { Request } from "express-serve-static-core";
import { IUser, User } from "../models/user.model";

export interface RequestCustom extends Request {
  user?: User;
}

export interface CreateUserRequestBody {
  name: string;
  email: string;
  password: string;
}

export interface SuccessCreateResponse {
  message?: string;
  error?: string;
}
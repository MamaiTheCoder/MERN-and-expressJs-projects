import { Request } from "express-serve-static-core";

import { User, IUser } from "../models/user.model";

export interface RequestCustom extends Request {
  user?: User;
  auth?: { _id: string }; // Assuming `auth` has an `_id` of type string
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

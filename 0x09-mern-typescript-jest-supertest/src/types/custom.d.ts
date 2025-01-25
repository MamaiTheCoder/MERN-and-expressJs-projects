import * as express from 'express';

import { IUser, User } from "../models/user.model";

// custom.d.ts is included in your TypeScript configuration
// (tsconfig.json) by specifying the correct include
// path or ensuring it’s located in a directory that
// TypeScript is aware of.
declare global {
    namespace Express {
        interface Request {
            user?: User // Add the user property with IUser type
            params: { userId: string }; // Add userId to params
        }
    }
}
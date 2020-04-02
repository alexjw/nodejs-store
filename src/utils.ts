import Path from 'path'
import {Request} from "express";
import User from "./models/user";

export interface RequestWithUser extends Request {
    user: User;
}

export const rootDirectory = Path.dirname(process.mainModule.filename);

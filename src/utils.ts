import Path from 'path'
import {Request} from "express";
import User, {UserInterface} from "./models/user";

export interface RequestWithUser extends Request {
    user: UserInterface;
}

export const rootDirectory = Path.dirname(process.mainModule.filename);

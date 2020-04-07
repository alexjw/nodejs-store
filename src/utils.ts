import Path from 'path'
import {Request} from "express";
import User, {UserInterface} from "./models/user";

export interface RequestWithUser extends Request {
    user: UserInterface;
}

export const CONNECTION_URL = 'mongodb+srv://user:nF6ouPL9lcB8jZ5x@freecodecamp-w89rl.gcp.mongodb.net/node-schwarzmuller-course?retryWrites=true&w=majority';

export const rootDirectory = Path.dirname(process.mainModule.filename);

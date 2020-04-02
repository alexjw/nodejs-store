import Path from 'path'
import {Request} from "express";
import User from "./models/user";
import mongodb from 'mongodb'

let db: mongodb.Db;

export const mongoConnect = () => {
    return mongodb.connect('mongodb+srv://user:nF6ouPL9lcB8jZ5x@freecodecamp-w89rl.gcp.mongodb.net/node-schwarzmuller-course?retryWrites=true&w=majority')
        .then(x => {db = x.db(); return x})
};

export const getDb = () => db;

export interface RequestWithUser extends Request {
    user: User;
}

export const rootDirectory = Path.dirname(process.mainModule.filename);

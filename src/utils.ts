import Path from 'path'

import * as Sqlite3 from 'sqlite3'
import {Sequelize} from 'sequelize';
import {Request} from "express";
import {User} from "./models/user";

export interface RequestWithUser extends Request {
    user: User;
}

export const rootDirectory = Path.dirname(process.mainModule.filename);

export const TheSequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'theDatabase.sqlite3'
});


/*export const Sqlite = Sqlite3.verbose();
export const DB = new Sqlite.Database('theDatabase.sqlite3');*/

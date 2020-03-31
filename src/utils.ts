import Path from 'path'

import * as Sqlite3 from 'sqlite3'
import {Sequelize} from 'sequelize';

export const rootDirectory = Path.dirname(process.mainModule.filename);

export const TheSequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'theDatabase.sqlite3'
});


/*export const Sqlite = Sqlite3.verbose();
export const DB = new Sqlite.Database('theDatabase.sqlite3');*/

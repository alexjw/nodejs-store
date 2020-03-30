import Path from 'path'

import * as Sqlite3 from 'sqlite3'

export const rootDirectory = Path.dirname(process.mainModule.filename);

export const Sqlite = Sqlite3.verbose();
export const DB = new Sqlite.Database('theDatabase.sqlite3');

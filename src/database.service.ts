import { Db } from 'mongodb';
import { connect as connectToDatabase, Mongoose } from 'mongoose';
import { from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface DatabaseConnectionInfo {
  host: string;
  port: number;
  username: string;
  password: string;
  dbName: string;
};

export class DatabaseService {
  private _database?: Db;

  get database() {
    if (this._database) {
      return of(this._database);
    }
    return from(this.connect(this.connectionInfo)).pipe(
      map(mongoose => mongoose.connection.db)
    );
  }

  constructor(private connectionInfo: DatabaseConnectionInfo) {
    this.connect(connectionInfo);
  }

  private connect(connectionInfo: DatabaseConnectionInfo) {
    return connectToDatabase(
      `mongodb://${connectionInfo.username}:${connectionInfo.password}@${connectionInfo.host}:${connectionInfo.port}`, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      dbName: connectionInfo.dbName
    });
  }
}
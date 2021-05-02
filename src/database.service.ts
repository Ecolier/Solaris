import { connect as connectToDatabase, Mongoose } from 'mongoose';
import { Subject } from 'rxjs';

export class DatabaseService {

  mongoose = new Subject<Mongoose>();

  constructor(
    public readonly host: string,
    public readonly port: number,
    public readonly username: string,
    public readonly password: string,
    public readonly dbName: string) {
    connectToDatabase(
      `mongodb://${this.username}:${this.password}@${this.host}:${this.port}`, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      dbName: this.dbName
    }).then(mongoose => {
      this.mongoose.next(mongoose);
    });
  }
}
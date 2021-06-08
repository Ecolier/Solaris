import { randomBytes } from "crypto"
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { DatabaseService } from "../database.service";

export class UserService {

  constructor(private databaseService: DatabaseService) {}

  createUser() {
    const username = randomBytes(4).toString('hex');
    const password = bcrypt.hashSync(randomBytes(4).toString('hex'), 10);

    this.databaseService.database.subscribe(database => {
      database.collection('user').insertOne({
        username: username,
        password: password,
      });
    });
    
    if (typeof process.env.JWT_KEY !== 'string') return;
    
    return jwt.sign({ username: username }, process.env.JWT_KEY)
  }

}
import { User } from '../models/user'
import { randomBytes } from 'crypto'
import { Collection } from 'mongodb'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { getUserCollection } from '../database'
 
export class AuthenticationController {

    private readonly collection = getUserCollection()

    async register (): Promise<any> {
    
        const username = randomBytes(4).toString('hex')
        const password = bcrypt.hashSync(randomBytes(4).toString('hex'), 10)
            
        this.collection.insertOne({
            username: username,
            password: password,
        })
        

        if (typeof process.env.JWT_KEY !== 'string') {
            return
        }

        return jwt.sign({ username: username }, process.env.JWT_KEY)

    }

    async findUser (username: string): Promise<User | void> {
        
        const result = await this.collection.findOne({
            username: username 
        })
    
        if (result == null) { return }
    
        return {
            username: result.username,
            longitude: result.location?.coordinates[0] ?? 0,
            latitude: result.location?.coordinates[1] ?? 0,
            hiddenFrom: result.hiddenFrom ?? []
        }
    }

    async login (username: string, password: string): Promise<User | void> {

        const result = await this.collection.findOne({
            $and: [
                { username : username },
                { password: password },
            ]
        })
    
        if (result == null) { return }
    
        return {
            username: result.username,
            longitude: result.location?.coordinates[0] ?? 0,
            latitude: result.location?.coordinates[1] ?? 0,
            hiddenFrom: result.hiddenFrom ?? []
        }
    
    }

}
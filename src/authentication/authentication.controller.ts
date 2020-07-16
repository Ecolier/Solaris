import { User } from '../models/user'
import { randomBytes } from 'crypto'
import { Collection } from 'mongodb'
import * as bcrypt from 'bcrypt'
 
export class AuthenticationController {

    constructor (private readonly collection: Collection) { }

    async register (): Promise<User> {
    
        const username = randomBytes(4).toString('hex')
        
        return bcrypt.hash(randomBytes(4).toString('hex'), 10).then((password) => {
            
            this.collection.insertOne({
                username: username,
                password: password,
            })
        
            return {
                username: username,
                password: password,
                latitude: 0, 
                longitude: 0,
                hiddenFrom: []
            }
        })

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
            password: result.password,
            longitude: result.location?.coordinates[0] ?? 0,
            latitude: result.location?.coordinates[1] ?? 0,
            hiddenFrom: result.hiddenFrom
        }
    
    }

}
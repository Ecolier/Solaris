import { User } from './models/user'
import { database } from './database'

import { randomBytes } from 'crypto'
 
const register = (): User => {
    
    const username = randomBytes(4).toString('hex')
    const password = randomBytes(4).toString('hex')

    database().collection('user').insertOne({
        username: username,
        password: password,
    })

    return {
        username: username,
        password: password,
        latitude: 0, 
        longitude: 0,
    }
}

const login = async (username: String, password: String): Promise<User | void> => {

    const result = await database().collection('user').findOne({
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
    }

}

export { 
    register,
    login,
}
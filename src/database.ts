import { MongoClient, Db, Collection } from 'mongodb'
import { User } from './models/user'

var _database: Db

const connect = async () => {
    const client = await new MongoClient('mongodb://localhost:27017').connect()
    _database = client.db('test')
}

const getDatabase = (): Db => {
    return _database
}

const getUserCollection = (): Collection => {
    return _database.collection('user')
}

export { 
    getDatabase, 
    getUserCollection,
    connect
}
import { MongoClient, Db, Collection } from 'mongodb'
import { User } from './models/user'

var _database: Db

const connect = async () => {
    const client = await new MongoClient('mongodb://root:example@172.25.0.2:27017/', {useUnifiedTopology: true}).connect()
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
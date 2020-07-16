import { MongoClient, Db } from 'mongodb'

var _database: Db

const connect = async () => {
    const client = await new MongoClient('mongodb://localhost:27017').connect()
    _database = client.db('test')
}

const getDatabase = (): Db => {
    return _database
}

export { 
    getDatabase, 
    connect
}
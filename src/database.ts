import { MongoClient, Db } from 'mongodb'

var _database: Db

const connect = async () => {
    const client = await new MongoClient('mongodb://localhost:27017').connect()
    _database = client.db('test')
}

const database = (): Db => {
    return _database
}

export { 
    database, 
    connect
}
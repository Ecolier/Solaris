const { MongoClient } = require('mongodb')

var db = {}

const connect = async () => {
    return new MongoClient('mongodb://localhost:27017', { useUnifiedTopology: true }).connect().then((client) => {
        db = client.db('test')
        return database
    })
}

const database = () => {
    return db
}

module.exports = { database, connect }
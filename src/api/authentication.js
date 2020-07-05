const express = require('express')
const { validate } = require('validate.js')

const { database } = require('../database')
const { loginSchema } = require('./schemas')
const user = require('../user')

const authentication = express.Router()

authentication.get('/', async (req, res, next) => {

    const registeredUser = user.create()

    await database().collection('user').insertOne({
        username: registeredUser.username,
        password: registeredUser.password
    })

    res.send(registeredUser)
})

authentication.post('/', async (req, res, next) => {
    
    if (validate(req.body, loginSchema)) {
        res.status(400).send()
        next()
    }
    
    res.send(
        await database().collection('user').findOne({
            $and: [
                { username : req.body.username },
                { password: req.body.password }
            ]
        })
    )
})

authentication.use((req, res, next) => {
    console.log('used')
})
    
module.exports = authentication
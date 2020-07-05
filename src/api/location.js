const express = require('express')
const { validate } = require('validate.js')

const { database } = require('../database')
const { loginSchema } = require('./schemas')
const user = require('../user')

const location = express.Router()

location.get('/', async (req, res, next) => {

    const registeredUser = user.create()

})
    
module.exports = location